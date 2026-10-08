import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

export interface PaymentUser {
  name: string;
  email: string;
  contact: string;
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  key: string;
  order?: any;
}

export interface VerifyPaymentResponse {
  success?: boolean;
  ok?: boolean;
  message?: string;
  error?: string;
}

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Razorpay Standard Web Checkout Integration:
   * 1. Calls backend POST /api/create-order with amount in paise (>= 100 paise)
   * 2. Opens Razorpay modal (https://checkout.razorpay.com/v1/checkout.js)
   * 3. On success, receives razorpay_payment_id, razorpay_order_id, razorpay_signature
   * 4. Sends all three to backend POST /api/verify-payment for HMAC-SHA256 signature verification
   * 5. Resolves true if verified, false if modal dismissed or verification fails
   */
  async pay(amountInRupees: number, user: PaymentUser): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }

    if (typeof (window as any).Razorpay === 'undefined') {
      this.toast.error('Payment SDK Missing', 'Razorpay Checkout SDK is still loading. Please refresh and try again.');
      return false;
    }

    // Convert Rupees to Paise (minimum 100 paise)
    const amountInPaise = Math.max(100, Math.round(amountInRupees * 100));

    try {
      // STEP 1: BACKEND - Call /api/create-order
      const orderRes = await firstValueFrom(
        this.http.post<CreateOrderResponse>(`${this.apiUrl}/api/create-order`, {
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        })
      );

      const orderId = orderRes?.order_id || orderRes?.order?.id;
      const keyId = orderRes?.key;

      if (!orderId || !keyId) {
        throw new Error('Invalid order payload returned from create-order endpoint');
      }

      // STEP 2: FRONTEND - Open Razorpay Modal
      return new Promise<boolean>((resolve) => {
        let isSettled = false;

        const options = {
          key: keyId,
          amount: orderRes.amount || amountInPaise,
          currency: orderRes.currency || 'INR',
          name: 'SpotBukk',
          description: 'Nights Worth Remembering | Pass Reservation',
          order_id: orderId,
          prefill: {
            name: user.name || '',
            email: user.email || '',
            contact: user.contact || ''
          },
          theme: {
            color: '#8b1d31' // Matches SpotBukk signature luxury burgundy accent
          },
          modal: {
            ondismiss: () => {
              if (!isSettled) {
                isSettled = true;
                this.toast.info('Payment Dismissed', 'You closed the checkout modal.');
                resolve(false);
              }
            }
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            if (isSettled) return;

            try {
              // STEP 3: BACKEND - Verify Signature at /api/verify-payment
              const verifyRes = await firstValueFrom(
                this.http.post<VerifyPaymentResponse>(`${this.apiUrl}/api/verify-payment`, {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              );

              if (verifyRes && (verifyRes.success || verifyRes.ok)) {
                isSettled = true;
                resolve(true);
              } else {
                isSettled = true;
                this.toast.error('Verification Mismatch', verifyRes?.error || 'Payment signature mismatch.');
                resolve(false);
              }
            } catch (verifyErr: any) {
              console.error('Signature verification error:', verifyErr);
              isSettled = true;
              const errMsg = verifyErr?.error?.error || verifyErr?.message || 'Server failed to verify payment signature.';
              this.toast.error('Verification Error', errMsg);
              resolve(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);

        // Handle payment.failed event
        rzp.on('payment.failed', (failData: any) => {
          console.error('Razorpay payment failed:', failData);
          const reason = failData?.error?.description || 'Payment was declined.';
          this.toast.error('Payment Failed', reason);
          if (!isSettled) {
            isSettled = true;
            resolve(false);
          }
        });

        rzp.open();
      });
    } catch (orderErr: any) {
      console.error('Order creation error:', orderErr);
      const errMsg = orderErr?.error?.error || orderErr?.message || 'Unable to communicate with order creation service.';
      this.toast.error('Order Creation Failed', errMsg);
      return false;
    }
  }
}
