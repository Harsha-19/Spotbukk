import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { QrCodeComponent } from '../../shared/components/qr-code/qr-code.component';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule, QrCodeComponent],
  template: `
    <div class="success-page container container-narrow" *ngIf="booking">
      <div class="success-card card-base glass-panel">
        <!-- Top Status Indicator -->
        <div class="status-marker">
          <div class="check-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span class="editorial-kicker">Admission Confirmed</span>
        </div>

        <h1 class="success-headline">YOU'RE IN.</h1>
        <p class="success-subtext">
          Your booking is confirmed. Your digital pass has been generated and added to your private guest registry.
        </p>

        <!-- Booking Pass Card Preview -->
        <div class="pass-preview-card card-base">
          <div class="pass-left">
            <img [src]="booking.heroImage" [alt]="booking.eventTitle" class="pass-thumb" />
            <div class="pass-details">
              <span class="pass-edition">{{ booking.eventEdition }}</span>
              <h3 class="pass-event-title">{{ booking.eventTitle }}</h3>
              <p class="pass-meta-line">{{ booking.eventDate }} · {{ booking.eventTime }}</p>
              <p class="pass-venue">{{ booking.eventVenue }}, {{ booking.eventCity }}</p>

              <div class="pass-badges-row">
                <span class="pass-pill">{{ booking.quantity }} &times; {{ booking.ticketTierName }}</span>
                <span class="pass-pill pill-gold">Paid ₹{{ booking.totalAmount }}</span>
              </div>
            </div>
          </div>

          <div class="pass-qr-side">
            <app-qr-code [value]="booking.qrPayload" [size]="100"></app-qr-code>
            <span class="qr-label">Pass #{{ booking.id }}</span>
          </div>
        </div>

        <!-- Audit & Receipt Details Table -->
        <div class="receipt-table">
          <div class="receipt-row">
            <span class="r-lbl">Booking Reference:</span>
            <span class="r-val font-mono">{{ booking.id }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Ticket Serial Code:</span>
            <span class="r-val font-mono">{{ booking.ticketCode }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Guest Name:</span>
            <span class="r-val">{{ booking.customer.fullName }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Confirmation Sent To:</span>
            <span class="r-val">{{ booking.customer.email }}</span>
          </div>
          <div class="receipt-row">
            <span class="r-lbl">Transaction Reference:</span>
            <span class="r-val font-mono">{{ booking.transactionId }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="success-actions">
          <a [routerLink]="['/ticket', booking.id]" class="btn btn-primary btn-lg">
            View Digital Ticket Pass
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a routerLink="/events" class="btn btn-outline">
            Browse More Events
          </a>
        </div>

        <p class="door-instruction-note">
          Exact penthouse coordinates and door entry code will be activated on your ticket pass 6 hours prior to door opening.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .success-page {
      padding: 60px 24px 96px;
    }

    .success-card {
      padding: 48px;
      border-radius: var(--radius-xl);
      text-align: center;
      position: relative;
      overflow: hidden;

      @media (max-width: 600px) {
        padding: 28px 20px;
      }
    }

    .status-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .check-circle {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--accent-text);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .success-headline {
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      letter-spacing: -0.01em;
      margin-bottom: 12px;
    }

    .success-subtext {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 540px;
      margin: 0 auto 36px;
      line-height: 1.6;
    }

    /* Pass Preview Card */
    .pass-preview-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      border-radius: var(--radius-md);
      background: var(--bg-surface-elevated);
      text-align: left;
      margin-bottom: 32px;
      gap: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .pass-left {
      display: flex;
      align-items: center;
      gap: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .pass-thumb {
      width: 88px;
      height: 88px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .pass-edition {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    .pass-event-title {
      font-size: 1.25rem;
      line-height: 1.15;
      margin-bottom: 4px;
    }

    .pass-meta-line,
    .pass-venue {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .pass-badges-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .pass-pill {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);

      &.pill-gold {
        border-color: var(--accent);
        color: var(--accent);
      }
    }

    .pass-qr-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .qr-label {
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    /* Receipt Table */
    .receipt-table {
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-md);
      padding: 18px 24px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 36px;
      font-size: 0.85rem;
    }

    .receipt-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 8px;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    .r-lbl {
      color: var(--text-muted);
    }

    .r-val {
      color: var(--text-primary);
      font-weight: 600;
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }

    .success-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .door-instruction-note {
      font-size: 0.78rem;
      color: var(--text-muted);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.5;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);

  booking?: Booking;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.booking = this.eventService.getBookingById(id);
      }
      if (!this.booking) {
        this.booking = this.eventService.bookings()[0];
      }
    });
  }
}
