import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { CheckInScanResult } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkin-page container">
      <!-- Header -->
      <div class="checkin-header">
        <div>
          <span class="editorial-kicker">Host Door Utility</span>
          <h1 class="checkin-title">SCAN TICKET</h1>
          <p class="checkin-subtext">
            High-speed door verification engine with instant tamper & duplicate detection.
          </p>
        </div>

        <div class="checkin-quick-stats">
          <div class="stat-pill">
            <span class="stat-lbl">Active Enclave</span>
            <span class="stat-val">AFTER DARK — VOL. 04</span>
          </div>
          <div class="stat-pill">
            <span class="stat-lbl">Checked In</span>
            <span class="stat-val text-accent">{{ eventService.totalCheckedIn() }} / {{ eventService.totalTicketsSold() }}</span>
          </div>
        </div>
      </div>

      <div class="checkin-grid">
        <!-- Scanner Viewport Column -->
        <div class="scanner-viewport-col">
          <div class="scanner-screen card-base">
            <!-- Simulated Camera Feed -->
            <div class="camera-lens-feed" [class.torch-on]="torchActive">
              <div class="viewfinder-frame">
                <!-- Corner Guides -->
                <div class="corner-guide corner-tl"></div>
                <div class="corner-guide corner-tr"></div>
                <div class="corner-guide corner-bl"></div>
                <div class="corner-guide corner-br"></div>

                <!-- Animated Laser Scan Bar -->
                <div class="laser-scanner-line" [class.scanning]="isScanning"></div>

                <!-- Center targeting label -->
                <div class="targeting-center">
                  <span class="target-text">ALIGN QR CODE WITHIN SIGHT</span>
                </div>
              </div>

              <!-- Scanner Controls Overlay -->
              <div class="scanner-controls-overlay">
                <button
                  type="button"
                  class="control-icon-btn"
                  (click)="torchActive = !torchActive"
                  [class.active]="torchActive"
                  title="Toggle Torch / Flash"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span>{{ torchActive ? 'Flash ON' : 'Flash OFF' }}</span>
                </button>

                <div class="gate-tag">
                  Gate 01 · Penthouse
                </div>
              </div>
            </div>

            <!-- Manual Barcode Search Bar -->
            <div class="manual-search-bar">
              <input
                type="text"
                [(ngModel)]="manualCode"
                (keyup.enter)="scanManual()"
                placeholder="Enter Serial Code or Booking ID (e.g. NOC-89241)..."
                class="form-control"
              />
              <button class="btn btn-primary btn-sm" (click)="scanManual()">
                Verify Pass
              </button>
            </div>
          </div>

          <!-- Demo State Controller Buttons -->
          <div class="demo-state-selector card-base">
            <div class="selector-header">
              <span class="editorial-kicker">Interactive Evaluation</span>
              <h4 class="selector-title">Test Required Scan States</h4>
              <p class="selector-desc">
                Click any state below to verify the door scanner response in real time:
              </p>
            </div>

            <div class="demo-buttons-group">
              <button
                class="btn btn-subtle demo-btn btn-state-valid"
                (click)="simulateState('valid')"
              >
                <span class="dot-indicator dot-success"></span>
                <span>Test State 01: Valid</span>
                <small>"ENTRY VERIFIED"</small>
              </button>

              <button
                class="btn btn-subtle demo-btn btn-state-used"
                (click)="simulateState('used')"
              >
                <span class="dot-indicator dot-warning"></span>
                <span>Test State 02: Already Used</span>
                <small>"TICKET ALREADY USED"</small>
              </button>

              <button
                class="btn btn-subtle demo-btn btn-state-invalid"
                (click)="simulateState('invalid')"
              >
                <span class="dot-indicator dot-error"></span>
                <span>Test State 03: Invalid</span>
                <small>"INVALID TICKET"</small>
              </button>
            </div>
          </div>
        </div>

        <!-- Verification Results & Live History Column -->
        <div class="results-stream-col">
          <!-- Active Scan Verification Result Card -->
          <div
            class="scan-result-card card-base"
            *ngIf="latestResult"
            [ngClass]="'state-' + latestResult.status"
          >
            <div class="result-status-header">
              <span class="result-status-badge">
                {{ latestResult.status.toUpperCase() }}
              </span>
              <span class="result-timestamp">{{ latestResult.scanTime }}</span>
            </div>

            <h3 class="result-headline">{{ latestResult.message }}</h3>

            <div class="result-guest-details" *ngIf="latestResult.ticket">
              <div class="res-row">
                <span class="res-lbl">Attendee:</span>
                <span class="res-val highlight-name">{{ latestResult.ticket.customer.fullName }}</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Ticket Tier:</span>
                <span class="res-val">{{ latestResult.ticket.ticketTierName }} (Party of {{ latestResult.ticket.quantity }})</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Event:</span>
                <span class="res-val">{{ latestResult.ticket.eventTitle }} {{ latestResult.ticket.eventEdition }}</span>
              </div>
              <div class="res-row">
                <span class="res-lbl">Ticket Serial:</span>
                <span class="res-val font-mono">{{ latestResult.ticket.ticketCode }}</span>
              </div>
              <div class="res-row" *ngIf="latestResult.ticket.additionalGuests.length > 0">
                <span class="res-lbl">With Guests:</span>
                <span class="res-val">{{ latestResult.ticket.additionalGuests.join(', ') }}</span>
              </div>
              <div class="res-row" *ngIf="latestResult.ticket.checkedInTime">
                <span class="res-lbl">Check-In Timestamp:</span>
                <span class="res-val">{{ latestResult.ticket.checkedInTime | date:'medium' }}</span>
              </div>
            </div>

            <div class="result-actions" *ngIf="latestResult.status === 'verified'">
              <span class="welcome-pass-pill">✓ WRISTBAND / ACCESS ISSUED</span>
            </div>
          </div>

          <!-- Live Gate Attendance Feed -->
          <div class="attendance-feed-card card-base">
            <div class="feed-header">
              <span class="feed-title">Door Verification Log</span>
              <span class="feed-badge">Live Feed</span>
            </div>

            <div class="feed-list">
              <div
                class="feed-item"
                *ngFor="let b of checkedInBookings"
              >
                <div class="feed-left">
                  <span class="feed-guest-name">{{ b.customer.fullName }}</span>
                  <span class="feed-tier-sub">{{ b.ticketTierName }} · {{ b.ticketCode }}</span>
                </div>
                <div class="feed-right">
                  <span class="status-pill status-verified">Verified</span>
                  <span class="feed-time">{{ b.checkedInTime ? (b.checkedInTime | date:'shortTime') : 'Just now' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkin-page {
      padding: 48px 24px 80px;
    }

    .checkin-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 20px;
    }

    .checkin-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      letter-spacing: -0.01em;
      margin-bottom: 6px;
    }

    .checkin-subtext {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .checkin-quick-stats {
      display: flex;
      gap: 16px;
    }

    .stat-pill {
      display: flex;
      flex-direction: column;
      padding: 10px 16px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);

      .stat-lbl {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .stat-val {
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 700;
      }
    }

    .text-accent {
      color: var(--accent);
    }

    .checkin-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    /* Scanner Viewport */
    .scanner-viewport-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .scanner-screen {
      padding: 24px;
      border-radius: var(--radius-lg);
      background: var(--bg-surface);
    }

    .camera-lens-feed {
      position: relative;
      height: 320px;
      background: #08090b;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 200ms;

      &.torch-on {
        background: #14171a;
      }
    }

    .viewfinder-frame {
      position: relative;
      width: 220px;
      height: 220px;
    }

    .corner-guide {
      position: absolute;
      width: 28px;
      height: 28px;
      border-color: var(--accent);
      border-style: solid;
    }

    .corner-tl {
      top: 0;
      left: 0;
      border-width: 3px 0 0 3px;
    }

    .corner-tr {
      top: 0;
      right: 0;
      border-width: 3px 3px 0 0;
    }

    .corner-bl {
      bottom: 0;
      left: 0;
      border-width: 0 0 3px 3px;
    }

    .corner-br {
      bottom: 0;
      right: 0;
      border-width: 0 3px 3px 0;
    }

    .laser-scanner-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
      animation: scanSweep 2.2s ease-in-out infinite alternate;
    }

    @keyframes scanSweep {
      0% { top: 10px; }
      100% { top: 210px; }
    }

    .targeting-center {
      position: absolute;
      bottom: -32px;
      left: 0;
      right: 0;
      text-align: center;
    }

    .target-text {
      font-size: 0.65rem;
      letter-spacing: 0.14em;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
    }

    .scanner-controls-overlay {
      position: absolute;
      bottom: 12px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .control-icon-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-sm);
      color: #ffffff;
      font-size: 0.75rem;

      &.active {
        background: var(--accent);
        border-color: var(--accent);
      }
    }

    .gate-tag {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
    }

    .manual-search-bar {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    /* Demo state buttons */
    .demo-state-selector {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .selector-header {
      margin-bottom: 18px;
    }

    .selector-title {
      font-size: 1.15rem;
      margin-bottom: 4px;
    }

    .selector-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .demo-buttons-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .demo-btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 14px 18px;
      text-align: left;

      small {
        margin-left: auto;
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 0.78rem;
      }
    }

    .dot-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;

      &.dot-success { background: var(--badge-success-text); }
      &.dot-warning { background: var(--badge-warning-text); }
      &.dot-error { background: var(--badge-error-text); }
    }

    /* Results Column */
    .results-stream-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .scan-result-card {
      padding: 28px;
      border-radius: var(--radius-lg);
      animation: popIn 200ms cubic-bezier(0.16, 1, 0.3, 1);

      &.state-verified {
        border-color: var(--badge-success-text);
        background: radial-gradient(circle at top right, var(--badge-success-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-success-bg);
          color: var(--badge-success-text);
        }
      }

      &.state-used {
        border-color: var(--badge-warning-text);
        background: radial-gradient(circle at top right, var(--badge-warning-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-warning-bg);
          color: var(--badge-warning-text);
        }
      }

      &.state-invalid {
        border-color: var(--badge-error-text);
        background: radial-gradient(circle at top right, var(--badge-error-bg) 0%, var(--bg-surface) 70%);

        .result-status-badge {
          background: var(--badge-error-bg);
          color: var(--badge-error-text);
        }
      }
    }

    .result-status-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .result-status-badge {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }

    .result-timestamp {
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .result-headline {
      font-size: 1.45rem;
      letter-spacing: -0.01em;
      margin-bottom: 20px;
    }

    .result-guest-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 16px;
      font-size: 0.85rem;
    }

    .res-row {
      display: flex;
      justify-content: space-between;

      .res-lbl {
        color: var(--text-muted);
      }

      .res-val {
        color: var(--text-primary);
        font-weight: 500;
      }

      .highlight-name {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 700;
      }
    }

    .font-mono {
      font-family: monospace;
      letter-spacing: 0.05em;
    }

    .result-actions {
      display: flex;
      justify-content: center;
    }

    .welcome-pass-pill {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--badge-success-text);
      letter-spacing: 0.06em;
    }

    /* Attendance Feed */
    .attendance-feed-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .feed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .feed-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .feed-badge {
      font-size: 0.7rem;
      color: var(--accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .feed-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
    }

    .feed-left {
      display: flex;
      flex-direction: column;
    }

    .feed-guest-name {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
    }

    .feed-tier-sub {
      font-size: 0.74rem;
      color: var(--text-muted);
    }

    .feed-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .feed-time {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class CheckInComponent implements OnInit {
  readonly eventService = inject(EventService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  manualCode = '';
  isScanning = true;
  torchActive = false;

  latestResult: CheckInScanResult | null = null;

  get checkedInBookings() {
    return this.eventService.bookings().filter(b => b.checkedIn);
  }

  ngOnInit(): void {
    // Check if ticket code passed in queryParams
    this.route.queryParamMap.subscribe(params => {
      const ticket = params.get('ticket');
      if (ticket) {
        this.manualCode = ticket;
        this.scanManual();
      } else {
        // Initial default state: valid
        this.simulateState('valid');
      }
    });
  }

  scanManual(): void {
    if (!this.manualCode.trim()) {
      this.toast.warning('Please enter a ticket code or booking reference.');
      return;
    }

    this.latestResult = this.eventService.verifyTicket(this.manualCode);
    if (this.latestResult.status === 'verified') {
      this.toast.success('Entry Verified', this.latestResult.ticket?.customer.fullName);
    } else if (this.latestResult.status === 'used') {
      this.toast.warning('Ticket Already Used', this.latestResult.message);
    } else {
      this.toast.error('Invalid Ticket', this.latestResult.message);
    }
  }

  simulateState(state: 'valid' | 'used' | 'invalid'): void {
    this.latestResult = this.eventService.verifyTicket('SIMULATED_TEST', state);

    if (state === 'valid') {
      this.toast.success('Simulation: ENTRY VERIFIED', 'Attendee admission granted.');
    } else if (state === 'used') {
      this.toast.warning('Simulation: TICKET ALREADY USED', 'Duplicate entry attempt flagged.');
    } else {
      this.toast.error('Simulation: INVALID TICKET', 'Revoked or non-existent ticket pass.');
    }
  }
}
