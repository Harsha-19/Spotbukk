import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { QrCodeComponent } from '../../shared/components/qr-code/qr-code.component';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule, QrCodeComponent],
  template: `
    <div class="ticket-page container container-narrow" *ngIf="booking">
      <!-- Top Action Bar -->
      <div class="ticket-top-bar">
        <a routerLink="/events" class="back-link">
          &larr; Discover Events
        </a>
        <div class="ticket-actions-group">
          <button class="btn btn-subtle btn-sm" (click)="savePass()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Save Pass
          </button>
          <a *ngIf="authService.isAdmin()" [routerLink]="['/admin/scanner']" class="btn btn-primary btn-sm">
            Door Scanner (Admin)
          </a>
        </div>
      </div>

      <!-- DIGITAL TICKET MASTER PASS -->
      <div class="ticket-master-container">
        <!-- Physical/Editorial Pass Card -->
        <div class="editorial-pass-card card-base">
          <!-- Pass Top: Event Media & Hero Information -->
          <div class="pass-hero-header">
            <img [src]="booking.heroImage" [alt]="booking.eventTitle" class="pass-artwork" />
            <div class="artwork-gradient"></div>

            <div class="pass-brand-tag">
              <span class="SpotBukk-seal">SpotBukk PASS</span>
              <span class="entry-status-badge" [class.verified]="booking.checkedIn">
                {{ booking.checkedIn ? 'ENTRY VERIFIED' : 'READY TO SCAN' }}
              </span>
            </div>

            <div class="pass-title-group">
              <span class="pass-edition-label">{{ booking.eventEdition }}</span>
              <h1 class="pass-main-title">{{ booking.eventTitle }}</h1>
              <p class="pass-location-tag">{{ booking.eventVenue }} · {{ booking.eventCity }}</p>
            </div>
          </div>

          <!-- Pass Mid: Schedule & Guest Ledger -->
          <div class="pass-mid-grid">
            <div class="grid-cell">
              <span class="cell-label">Date of Event</span>
              <span class="cell-value">{{ booking.eventDate }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Doors Open</span>
              <span class="cell-value">{{ booking.eventTime }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Admitted Guest</span>
              <span class="cell-value">{{ booking.customer.fullName }}</span>
            </div>
            <div class="grid-cell">
              <span class="cell-label">Tier & Party Size</span>
              <span class="cell-value">{{ booking.ticketTierName }} ({{ booking.quantity }})</span>
            </div>
          </div>

          <!-- Perforated Tear-off Line with Realistic Notches -->
          <div class="perforation-divider">
            <div class="cutout-notch notch-left"></div>
            <div class="dashed-stitch-line"></div>
            <div class="cutout-notch notch-right"></div>
          </div>

          <!-- Pass Bottom: High Security QR & Barcode Section -->
          <div class="pass-bottom-section">
            <div class="qr-cluster">
              <div class="qr-frame">
                <app-qr-code [value]="booking.qrPayload" [size]="160"></app-qr-code>
              </div>
              <div class="qr-badge-banner">
                <span class="scan-entry-kicker">SCAN AT ENTRY</span>
              </div>
            </div>

            <div class="pass-security-column">
              <div class="sec-item">
                <span class="sec-lbl">Booking Reference</span>
                <span class="sec-val font-mono">{{ booking.id }}</span>
              </div>
              <div class="sec-item">
                <span class="sec-lbl">Ticket Serial Code</span>
                <span class="sec-val font-mono">{{ booking.ticketCode }}</span>
              </div>
              <div class="sec-item">
                <span class="sec-lbl">Gate / Check-in Portal</span>
                <span class="sec-val">Penthouse Express Gate 01</span>
              </div>
              <div class="sec-item" *ngIf="booking.additionalGuests.length > 0">
                <span class="sec-lbl">Registered Guests</span>
                <span class="sec-val">{{ booking.additionalGuests.join(', ') }}</span>
              </div>
            </div>
          </div>

          <!-- Pass Footer Notice -->
          <div class="pass-rules-strip">
            <span>21+ ID VERIFICATION MANDATORY · ADMITTANCE HARD-CAPPED · NON-TRANSFERABLE AT DOOR</span>
          </div>
        </div>

        <!-- Wallet Shortcuts -->
        <div class="wallet-buttons-row">
          <button class="wallet-btn" (click)="mockAddToWallet('Apple Wallet')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.39-.56.65-.96 1.7-0.83 2.73 1.05.08 2.06-.54 2.58-1.25z"/>
            </svg>
            Add to Apple Wallet
          </button>
          <button class="wallet-btn" (click)="mockAddToWallet('Google Wallet')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Add to Google Wallet
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticket-page {
      padding: 48px 24px 80px;
    }

    .ticket-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .ticket-actions-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ticket-master-container {
      max-width: 580px;
      margin: 0 auto;
    }

    /* Editorial Physical-Style Pass Card */
    .editorial-pass-card {
      background: var(--bg-surface);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-drawer);
      position: relative;
    }

    .pass-hero-header {
      position: relative;
      min-height: 220px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .pass-artwork {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.35) saturate(0.9);
      z-index: 0;
    }

    .artwork-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
      z-index: 1;
    }

    .pass-brand-tag {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .SpotBukk-seal {
      font-family: var(--font-display);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #ffffff;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-sm);
    }

    .entry-status-badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);

      &.verified {
        background: var(--badge-success-bg);
        color: var(--badge-success-text);
        border-color: var(--badge-success-text);
      }
    }

    .pass-title-group {
      position: relative;
      z-index: 2;
      margin-top: 24px;
    }

    .pass-edition-label {
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    .pass-main-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-weight: 800;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .pass-location-tag {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.8);
    }

    /* Mid Grid */
    .pass-mid-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 24px;
      gap: 16px;
      background: var(--bg-surface-elevated);
    }

    .grid-cell {
      display: flex;
      flex-direction: column;

      .cell-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin-bottom: 2px;
      }

      .cell-value {
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    /* Perforation / Tear-off Notches */
    .perforation-divider {
      position: relative;
      height: 24px;
      background: var(--bg-surface-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .dashed-stitch-line {
      width: 100%;
      height: 0;
      border-top: 2px dashed var(--border-medium);
    }

    .cutout-notch {
      position: absolute;
      top: 50%;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--bg-page);
      transform: translateY(-50%);
      z-index: 3;
    }

    .notch-left {
      left: -11px;
    }

    .notch-right {
      right: -11px;
    }

    /* Bottom Section */
    .pass-bottom-section {
      padding: 28px 24px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 28px;
      align-items: center;
      background: var(--bg-surface-elevated);

      @media (max-width: 540px) {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
      }
    }

    .qr-cluster {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .qr-frame {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .scan-entry-kicker {
      font-family: var(--font-display);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: var(--accent);
    }

    .pass-security-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sec-item {
      display: flex;
      flex-direction: column;

      .sec-lbl {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .sec-val {
        font-size: 0.88rem;
        color: var(--text-primary);
        font-weight: 600;
      }
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.06em;
    }

    .pass-rules-strip {
      padding: 12px 20px;
      background: var(--bg-surface);
      border-top: 1px solid var(--border-subtle);
      text-align: center;
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Wallet Row */
    .wallet-buttons-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 24px;

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }
    }

    .wallet-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--text-primary);
        transform: translateY(-1px);
      }
    }
  `]
})
export class TicketComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);
  readonly authService = inject(AuthService);

  booking?: Booking;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.booking = this.eventService.getBookingById(id);
      }
      if (!this.booking) {
        this.booking = this.eventService.bookings()[0];
      }
    });
  }

  savePass(): void {
    this.toast.success(
      'Pass Saved',
      'Offline cryptographic token cached to device storage.'
    );
  }

  mockAddToWallet(walletType: string): void {
    this.toast.info(
      `Pass Added to ${walletType}`,
      'NFC contactless pass ready for door tap.'
    );
  }
}
