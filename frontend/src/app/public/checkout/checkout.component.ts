import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { PaymentMethod } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkout-page container container-narrow" *ngIf="session">
      <!-- Top Bar -->
      <div class="checkout-top">
        <a [routerLink]="['/events', session.event.id, 'register']" class="back-link">
          &larr; Back to Registration
        </a>
        <div class="secure-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>256-Bit Encrypted Checkout</span>
        </div>
      </div>

      <div class="checkout-grid">
        <!-- Left: Payment Method Selection & Form -->
        <div class="payment-col card-base">
          <div class="col-header">
            <span class="editorial-kicker">Payment Selection</span>
            <h2 class="col-title">Select Payment Instrument</h2>
            <p class="col-desc">Choose your preferred payment method. This is a secure demo environment.</p>
          </div>

          <!-- Method Tabs -->
          <div class="method-tabs">
            <button
              class="method-tab"
              [class.active]="selectedMethod === 'UPI'"
              (click)="selectedMethod = 'UPI'"
            >
              <span class="method-name">UPI / QR</span>
              <span class="method-hint">Instant</span>
            </button>

            <button
              class="method-tab"
              [class.active]="selectedMethod === 'Card'"
              (click)="selectedMethod = 'Card'"
            >
              <span class="method-name">Credit / Debit Card</span>
              <span class="method-hint">Visa, MC, Amex</span>
            </button>

            <button
              class="method-tab"
              [class.active]="selectedMethod === 'Net Banking'"
              (click)="selectedMethod = 'Net Banking'"
            >
              <span class="method-name">Net Banking</span>
              <span class="method-hint">All Major Banks</span>
            </button>
          </div>

          <!-- UPI Form -->
          <div class="method-content" *ngIf="selectedMethod === 'UPI'">
            <div class="upi-apps-row">
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'gpay'"
                (click)="selectedUpiApp = 'gpay'"
              >
                <span>Google Pay</span>
              </button>
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'phonepe'"
                (click)="selectedUpiApp = 'phonepe'"
              >
                <span>PhonePe</span>
              </button>
              <button
                type="button"
                class="upi-app-btn"
                [class.selected]="selectedUpiApp === 'paytm'"
                (click)="selectedUpiApp = 'paytm'"
              >
                <span>Paytm UPI</span>
              </button>
            </div>

            <div class="or-separator">
              <span>OR ENTER VPA / UPI ID</span>
            </div>

            <div class="form-group">
              <label for="vpaInput">Virtual Payment Address (VPA)</label>
              <input
                id="vpaInput"
                type="text"
                class="form-control"
                [(ngModel)]="vpaAddress"
                placeholder="e.g. rohan.mehra@okhdfcbank"
              />
              <span class="form-hint">A mock payment notification request will be simulated.</span>
            </div>
          </div>

          <!-- Card Form -->
          <div class="method-content" *ngIf="selectedMethod === 'Card'">
            <div class="form-group">
              <label for="cardHolder">Cardholder Name</label>
              <input
                id="cardHolder"
                type="text"
                class="form-control"
                [(ngModel)]="cardHolder"
                placeholder="Name as printed on card"
              />
            </div>

            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                class="form-control"
                [(ngModel)]="cardNumber"
                placeholder="4532 •••• •••• 8920"
                maxlength="19"
              />
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label for="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  class="form-control"
                  [(ngModel)]="cardExpiry"
                  placeholder="MM / YY"
                  maxlength="5"
                />
              </div>
              <div class="form-group">
                <label for="cvv">Security Code (CVV)</label>
                <input
                  id="cvv"
                  type="password"
                  class="form-control"
                  [(ngModel)]="cardCvv"
                  placeholder="•••"
                  maxlength="4"
                />
              </div>
            </div>
          </div>

          <!-- Net Banking Form -->
          <div class="method-content" *ngIf="selectedMethod === 'Net Banking'">
            <div class="form-group">
              <label>Select Your Bank</label>
              <div class="bank-grid">
                <label
                  class="bank-box"
                  *ngFor="let b of banks"
                  [class.selected]="selectedBank === b"
                >
                  <input
                    type="radio"
                    name="bankChoice"
                    [value]="b"
                    [(ngModel)]="selectedBank"
                  />
                  <span>{{ b }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Payment Action Button -->
          <div class="pay-cta-wrap">
            <button
              class="btn btn-primary btn-lg w-full"
              (click)="processPayment()"
              [disabled]="isProcessing"
            >
              <span *ngIf="!isProcessing">Pay ₹{{ session.total }} with Razorpay</span>
              <span *ngIf="isProcessing" class="processing-wrap">
                <span class="spinner"></span>
                Processing Payment (₹{{ session.total }})...
              </span>
            </button>
          </div>

          <p class="demo-disclaimer">
            * Razorpay Test Mode: UPI, Cards & Net Banking enabled.
          </p>
        </div>

        <!-- Right: Order Summary Sticky Panel -->
        <aside class="summary-col">
          <div class="summary-card card-base glass-panel">
            <h3 class="summary-title">Order Summary</h3>

            <!-- Event item -->
            <div class="summary-event-row">
              <img [src]="session.event.heroImage" [alt]="session.event.title" class="summary-thumb" />
              <div>
                <h4 class="summary-event-name">{{ session.event.title }}</h4>
                <p class="summary-event-edition">{{ session.event.edition }}</p>
                <p class="summary-event-sub">{{ session.event.date }}</p>
                <p class="summary-event-sub">{{ session.event.venue }}, {{ session.event.city }}</p>
              </div>
            </div>

            <!-- Breakdown -->
            <div class="summary-breakdown">
              <div class="summary-line">
                <span class="line-label">{{ session.tier.name }} &times; {{ session.quantity }}</span>
                <span class="line-val">₹{{ session.subtotal }}</span>
              </div>
              <div class="summary-line">
                <span class="line-label">Platform Convenience Fee</span>
                <span class="line-val">₹{{ session.convenienceFee }}</span>
              </div>
              <div class="summary-line total-line">
                <span class="total-lbl">Total Payable</span>
                <span class="total-val">₹{{ session.total }}</span>
              </div>
            </div>

            <!-- Attendee Summary -->
            <div class="summary-guest-box">
              <span class="guest-box-lbl">Primary Guest</span>
              <p class="guest-name">{{ session.attendee.fullName }}</p>
              <p class="guest-contact">{{ session.attendee.email }}</p>
              <p class="guest-contact">{{ session.attendee.phone }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 48px 24px 80px;
    }

    .checkout-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .secure-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;

      svg {
        color: var(--badge-success-text);
      }
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 36px;

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
      }
    }

    .payment-col {
      padding: 32px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 20px;
      }
    }

    .col-header {
      margin-bottom: 24px;
    }

    .col-title {
      font-size: 1.5rem;
      margin-bottom: 4px;
    }

    .col-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    /* Method Tabs */
    .method-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 28px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .method-tab {
      padding: 12px 14px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .method-name {
          color: var(--accent);
        }
      }
    }

    .method-name {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .method-hint {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .method-content {
      padding: 20px 0;
      border-top: 1px solid var(--border-subtle);
      margin-bottom: 24px;
    }

    .upi-apps-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .upi-app-btn {
      padding: 12px 8px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);

      &:hover {
        border-color: var(--border-medium);
      }

      &.selected {
        border-color: var(--accent);
        background: var(--accent-subtle);
        color: var(--accent);
      }
    }

    .or-separator {
      text-align: center;
      margin: 16px 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--border-subtle);
      }

      span {
        position: relative;
        background: var(--bg-surface);
        padding: 0 12px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--text-muted);
      }
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .bank-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .bank-box {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.85rem;

      &.selected {
        border-color: var(--accent);
      }

      input {
        accent-color: var(--accent);
      }
    }

    .pay-cta-wrap {
      margin-top: 16px;
      margin-bottom: 12px;
    }

    .w-full {
      width: 100%;
    }

    .demo-disclaimer {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-align: center;
    }

    .processing-wrap {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 600ms linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Summary Column */
    .summary-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .summary-title {
      font-size: 1.15rem;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .summary-event-row {
      display: flex;
      gap: 14px;
      margin-bottom: 20px;
    }

    .summary-thumb {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .summary-event-name {
      font-size: 1rem;
      line-height: 1.2;
    }

    .summary-event-edition {
      font-size: 0.76rem;
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .summary-event-sub {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .summary-breakdown {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 16px;
      font-size: 0.85rem;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);

      &.total-line {
        padding-top: 8px;
        margin-top: 4px;
        border-top: 1px dashed var(--border-subtle);
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .total-val {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    .summary-guest-box {
      padding: 12px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
    }

    .guest-box-lbl {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-bottom: 4px;
      font-weight: 700;
    }

    .guest-name {
      font-weight: 700;
      color: var(--text-primary);
    }

    .guest-contact {
      color: var(--text-secondary);
      font-size: 0.76rem;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);
  private readonly paymentService = inject(PaymentService);

  session = this.eventService.activeCheckoutSession();

  selectedMethod: PaymentMethod = 'UPI';
  selectedUpiApp = 'gpay';
  vpaAddress = 'rohan.mehra@okhdfcbank';

  // Card fields
  cardHolder = 'Rohan Mehra';
  cardNumber = '4532 8901 2341 8920';
  cardExpiry = '08/28';
  cardCvv = '849';

  // Net banking
  readonly banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'IndusInd Bank'];
  selectedBank = 'HDFC Bank';

  isProcessing = false;

  ngOnInit(): void {
    // If user navigated directly to /checkout with no active session, create a default demo session
    if (!this.session) {
      const fallbackEvent = this.eventService.events()[0];
      const fallbackTier = fallbackEvent.ticketTiers[0];
      const qty = 2;
      const sub = fallbackTier.price * qty;
      const fee = Math.round(sub * 0.05);

      this.session = {
        event: fallbackEvent,
        tier: fallbackTier,
        quantity: qty,
        attendee: {
          fullName: 'Rohan Mehra',
          email: 'rohan.mehra@gmail.com',
          phone: '+91 98450 18239'
        },
        additionalGuests: ['Natasha Roy'],
        subtotal: sub,
        convenienceFee: fee,
        total: sub + fee
      };
      this.eventService.setCheckoutSession(this.session);
    }
  }

  async processPayment(): Promise<void> {
    if (this.isProcessing || !this.session) return;
    this.isProcessing = true;

    const userDetails = {
      name: this.session.attendee.fullName || 'Guest',
      email: this.session.attendee.email || '',
      contact: this.session.attendee.phone || ''
    };

    try {
      // 1. Invoke Razorpay checkout via PaymentService
      const isPaid = await this.paymentService.pay(this.session.total, userDetails);

      // 2. Only if verified successfully, commit booking and navigate to success
      if (isPaid) {
        const booking = this.eventService.createBookingFromSession(this.selectedMethod);
        this.toast.success('Payment Authorized', `Booking reference ${booking.id} confirmed.`);
        this.router.navigate(['/payment-success'], { queryParams: { id: booking.id } });
      } else {
        // If user cancelled popup or verification failed, stay on /checkout and notify
        this.toast.error('Payment Incomplete', 'Payment was cancelled or could not be verified.');
      }
    } catch (err: any) {
      console.error('Error during checkout payment:', err);
      this.toast.error('Payment Error', err?.message || 'Payment processing failed.');
    } finally {
      this.isProcessing = false;
    }
  }

  simulatePayment(): void {
    this.processPayment();
  }
}
