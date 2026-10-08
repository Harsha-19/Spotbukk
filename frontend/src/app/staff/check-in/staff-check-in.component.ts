import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import jsQR from 'jsqr';
import { StaffDataService } from '../services/staff-data.service';
import {
  StaffEvent,
  StaffTicket,
  ValidationResult,
  ValidationOutcome
} from '../../core/data/staff-seed.data';
import { ToastService } from '../../core/services/toast.service';

type ValidationViewMode = 'idle' | 'result' | 'success';

@Component({
  selector: 'app-staff-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="check-in-page container">
      <!-- Top Breadcrumb / Navigation -->
      <div class="top-nav-bar">
        <a routerLink="/staff" class="back-link">&larr; Back to Dashboard</a>

        <!-- Active Event Selector -->
        <div class="event-selector-wrap">
          <label class="event-sel-label" for="active-event-select">Active Event Gate:</label>
          <select
            id="active-event-select"
            class="event-select"
            [ngModel]="selectedEventId()"
            (ngModelChange)="onEventChange($event)"
          >
            <option *ngFor="let ev of staffData.events()" [value]="ev.id">
              {{ ev.title }} ({{ ev.city }})
            </option>
          </select>
        </div>
      </div>

      <!-- Main Operational Header -->
      <div class="page-header">
        <span class="editorial-kicker">SPOTBUKK DOOR OPERATIONS</span>
        <h1 class="page-title">CHECK-IN</h1>
        <p class="page-subtitle">
          Scan a guest's QR pass or enter the booking code manually.
        </p>
      </div>

      <!-- Gate Quick Status Info -->
      <div *ngIf="selectedEvent" class="gate-info-strip card-base">
        <div class="gate-info-item">
          <span class="strip-label">Event</span>
          <span class="strip-value">{{ selectedEvent.title }}</span>
        </div>
        <div class="gate-info-item">
          <span class="strip-label">Venue</span>
          <span class="strip-value">{{ selectedEvent.venue }}, {{ selectedEvent.city }}</span>
        </div>
        <div class="gate-info-item">
          <span class="strip-label">Gate Progress</span>
          <span class="strip-value highlight-text">
            {{ selectedEvent.checkedIn }} / {{ selectedEvent.expectedGuests }} Checked In
          </span>
        </div>
      </div>

      <div class="check-in-layout">
        <!-- LEFT: Primary Scanner & Manual Input -->
        <div class="input-panel card-base">
          <!-- Mode Tabs: Camera Scan vs Manual Code -->
          <div class="mode-tabs">
            <button
              type="button"
              class="mode-tab-btn"
              [class.active]="activeTab === 'scan'"
              (click)="setTab('scan')"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10" rx="1"/>
              </svg>
              SCAN QR
            </button>
            <button
              type="button"
              class="mode-tab-btn"
              [class.active]="activeTab === 'manual'"
              (click)="setTab('manual')"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"/>
                <line x1="7" y1="8" x2="17" y2="8"/>
                <line x1="7" y1="12" x2="17" y2="12"/>
                <line x1="7" y1="16" x2="12" y2="16"/>
              </svg>
              MANUAL CODE
            </button>
          </div>

          <!-- TAB 1: Live QR Camera Scanner -->
          <div *ngIf="activeTab === 'scan'" class="camera-section">
            <div class="viewfinder-container">
              <video #videoElement class="camera-feed" playsinline muted></video>
              <canvas #canvasElement class="hidden-canvas"></canvas>

              <!-- Viewfinder Overlay Reticle -->
              <div class="viewfinder-reticle">
                <div class="reticle-corner tl"></div>
                <div class="reticle-corner tr"></div>
                <div class="reticle-corner bl"></div>
                <div class="reticle-corner br"></div>
                <div class="laser-scanner-line" *ngIf="isScanning()"></div>
              </div>

              <!-- Camera Feedback / Overlay Message -->
              <div *ngIf="!cameraActive() && !cameraError()" class="camera-placeholder">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>Live Camera Ready</span>
                <button type="button" class="btn btn-primary btn-sm" (click)="startCamera()">
                  Start Camera Feed
                </button>
              </div>

              <div *ngIf="cameraError()" class="camera-error-banner">
                <span>{{ cameraError() }}</span>
                <button type="button" class="btn btn-subtle btn-sm" (click)="startCamera()">
                  Retry Camera
                </button>
              </div>
            </div>

            <!-- Camera Controls -->
            <div class="camera-controls">
              <button
                *ngIf="cameraActive()"
                type="button"
                class="btn btn-subtle btn-sm"
                (click)="stopCamera()"
              >
                Pause Camera
              </button>
              <button
                *ngIf="!cameraActive() && !cameraError()"
                type="button"
                class="btn btn-primary btn-sm"
                (click)="startCamera()"
              >
                Resume Camera
              </button>
            </div>
          </div>

          <!-- TAB 2: Manual Code Input -->
          <div *ngIf="activeTab === 'manual'" class="manual-code-section">
            <form (ngSubmit)="handleManualValidate()" class="manual-form">
              <div class="form-group">
                <label class="form-label" for="ticket-code-input">Booking / Ticket Code</label>
                <div class="input-with-button">
                  <input
                    id="ticket-code-input"
                    type="text"
                    [(ngModel)]="manualCode"
                    name="manualCode"
                    placeholder="e.g. TKT-66381-SD"
                    class="form-control code-input"
                    autocomplete="off"
                    autocapitalize="characters"
                    required
                  />
                  <button
                    type="submit"
                    id="btn-validate"
                    class="btn btn-primary validate-btn"
                    [disabled]="!manualCode.trim()"
                  >
                    VALIDATE
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Quick Test / Demo Seeds Selector (For effortless testing) -->
          <div class="demo-seed-chips-card">
            <span class="chips-title">Quick Demo Test Codes:</span>
            <div class="chips-grid">
              <button
                type="button"
                class="demo-chip chip-valid"
                (click)="applyDemoCode('TKT-66381-SD')"
                title="Pranav Joshi (Issued)"
              >
                ✓ TKT-66381-SD <span class="chip-hint">(Valid)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-valid"
                (click)="applyDemoCode('TKT-77519-RS')"
                title="Meera Nambiar (Rooftop)"
              >
                ✓ TKT-77519-RS <span class="chip-hint">(Rooftop)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-warning"
                (click)="applyDemoCode('TKT-44021-USED')"
                title="Rohit Nair (Used)"
              >
                ⚠ TKT-44021-USED <span class="chip-hint">(Used)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-error"
                (click)="applyDemoCode('TKT-99102-CANCEL')"
                title="Ananya Rao (Cancelled)"
              >
                ✕ TKT-99102-CANCEL <span class="chip-hint">(Cancel)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-error"
                (click)="applyDemoCode('TKT-33108-EXP')"
                title="Vikram Malhotra (Expired)"
              >
                ✕ TKT-33108-EXP <span class="chip-hint">(Expired)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-error"
                (click)="applyDemoCode('TKT-88412-DIFF')"
                title="Kavya Pillai (Other Event)"
              >
                ✕ TKT-88412-DIFF <span class="chip-hint">(Wrong Event)</span>
              </button>
              <button
                type="button"
                class="demo-chip chip-error"
                (click)="applyDemoCode('INVALID-SAMPLE-000')"
                title="Non-existent code"
              >
                ✕ UNKNOWN CODE <span class="chip-hint">(Invalid)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT: Validation Result Cards -->
        <div class="result-panel">
          <!-- STATE 1: IDLE / WAITING -->
          <div *ngIf="viewMode() === 'idle'" class="result-placeholder card-base">
            <div class="placeholder-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h3 class="placeholder-title">Awaiting Ticket Scan</h3>
            <p class="placeholder-desc">
              Scan a QR digital pass with the camera or submit a booking code to verify clearance.
            </p>
          </div>

          <!-- STATE 2: VALID PASS (READY FOR ENTRY) -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'VALID'"
            class="result-card valid-card card-base fade-in"
          >
            <div class="result-header valid-header">
              <span class="status-symbol">✓</span>
              <h2 class="status-heading">VALID PASS</h2>
            </div>

            <div class="guest-info-block">
              <span class="guest-name">{{ validationResult?.ticket?.guestName }}</span>
              <span class="ticket-code-tag">{{ validationResult?.ticket?.ticketCode }}</span>
            </div>

            <div class="details-list">
              <div class="detail-row">
                <span class="detail-label">Pass:</span>
                <span class="detail-value highlight-pass">{{ validationResult?.ticket?.passType }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event:</span>
                <span class="detail-value">{{ validationResult?.ticket?.eventTitle }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value status-ready">READY FOR ENTRY</span>
              </div>
            </div>

            <div class="action-block">
              <button
                type="button"
                id="btn-check-in-guest"
                class="btn btn-primary btn-lg w-full check-in-btn"
                (click)="handleCheckInGuest()"
              >
                CHECK IN GUEST
              </button>
            </div>
          </div>

          <!-- STATE 3: ALREADY USED -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'ALREADY_USED'"
            class="result-card used-card card-base fade-in"
          >
            <div class="result-header used-header">
              <span class="status-symbol">⚠</span>
              <h2 class="status-heading">ALREADY USED</h2>
            </div>

            <p class="warning-text">This ticket has already been checked in.</p>

            <div class="guest-info-block" *ngIf="validationResult?.ticket?.guestName">
              <span class="guest-name">{{ validationResult?.ticket?.guestName }}</span>
              <span class="ticket-code-tag">{{ validationResult?.ticket?.ticketCode }}</span>
            </div>

            <div class="details-list">
              <div class="detail-row">
                <span class="detail-label">Checked in:</span>
                <span class="detail-value">{{ validationResult?.checkedInTime }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Gate:</span>
                <span class="detail-value">{{ validationResult?.gate || 'Main Entrance' }}</span>
              </div>
            </div>

            <div class="action-block">
              <button type="button" class="btn btn-subtle w-full" (click)="resetValidation()">
                SCAN NEXT
              </button>
            </div>
          </div>

          <!-- STATE 4: INVALID PASS -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'INVALID'"
            class="result-card invalid-card card-base fade-in"
          >
            <div class="result-header invalid-header">
              <span class="status-symbol">✕</span>
              <h2 class="status-heading">INVALID PASS</h2>
            </div>

            <p class="error-text">This ticket could not be validated.</p>

            <div class="action-block">
              <button type="button" class="btn btn-subtle w-full" (click)="resetValidation()">
                TRY AGAIN
              </button>
            </div>
          </div>

          <!-- STATE 5: EXPIRED PASS -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'EXPIRED'"
            class="result-card invalid-card card-base fade-in"
          >
            <div class="result-header invalid-header">
              <span class="status-symbol">✕</span>
              <h2 class="status-heading">EXPIRED PASS</h2>
            </div>

            <p class="error-text">This ticket is no longer valid.</p>

            <div class="guest-info-block" *ngIf="validationResult?.ticket?.guestName">
              <span class="guest-name">{{ validationResult?.ticket?.guestName }}</span>
              <span class="ticket-code-tag">{{ validationResult?.ticket?.ticketCode }}</span>
            </div>

            <div class="action-block">
              <button type="button" class="btn btn-subtle w-full" (click)="resetValidation()">
                SCAN NEXT
              </button>
            </div>
          </div>

          <!-- STATE 6: CANCELLED PASS -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'CANCELLED'"
            class="result-card invalid-card card-base fade-in"
          >
            <div class="result-header invalid-header">
              <span class="status-symbol">✕</span>
              <h2 class="status-heading">CANCELLED PASS</h2>
            </div>

            <p class="error-text">This booking has been cancelled.</p>

            <div class="guest-info-block" *ngIf="validationResult?.ticket?.guestName">
              <span class="guest-name">{{ validationResult?.ticket?.guestName }}</span>
              <span class="ticket-code-tag">{{ validationResult?.ticket?.ticketCode }}</span>
            </div>

            <div class="action-block">
              <button type="button" class="btn btn-subtle w-full" (click)="resetValidation()">
                SCAN NEXT
              </button>
            </div>
          </div>

          <!-- STATE 7: WRONG EVENT -->
          <div
            *ngIf="viewMode() === 'result' && validationResult?.outcome === 'WRONG_EVENT'"
            class="result-card invalid-card card-base fade-in"
          >
            <div class="result-header invalid-header">
              <span class="status-symbol">✕</span>
              <h2 class="status-heading">WRONG EVENT</h2>
            </div>

            <p class="error-text">This ticket belongs to another event.</p>

            <div class="details-list" *ngIf="validationResult?.ticket">
              <div class="detail-row">
                <span class="detail-label">Ticket Event:</span>
                <span class="detail-value highlight-pass">{{ validationResult?.ticket?.eventTitle }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Current Gate:</span>
                <span class="detail-value">{{ selectedEvent?.title }}</span>
              </div>
              <div class="detail-row" *ngIf="validationResult?.ticket?.guestName">
                <span class="detail-label">Guest:</span>
                <span class="detail-value">{{ validationResult?.ticket?.guestName }}</span>
              </div>
            </div>

            <div class="action-block">
              <button type="button" class="btn btn-subtle w-full" (click)="resetValidation()">
                SCAN NEXT
              </button>
            </div>
          </div>

          <!-- STATE 8: CHECK-IN SUCCESSFUL (Prompt Section 10) -->
          <div
            *ngIf="viewMode() === 'success'"
            class="result-card success-card card-base fade-in"
          >
            <div class="result-header success-header">
              <span class="status-symbol">✓</span>
              <h2 class="status-heading">CHECK-IN SUCCESSFUL</h2>
            </div>

            <div class="success-body">
              <h3 class="success-guest-name">{{ successData?.guestName }}</h3>
              <p class="success-pass-type">{{ successData?.passType }}</p>
              <p class="success-event-title">{{ successData?.eventTitle }}</p>

              <div class="success-meta">
                <span>Checked in at {{ successData?.checkedInTime }}</span>
                <span>Gate: {{ successData?.gate }}</span>
              </div>
            </div>

            <div class="action-block">
              <button
                type="button"
                id="btn-scan-next"
                class="btn btn-primary btn-lg w-full scan-next-btn"
                (click)="resetValidation()"
              >
                SCAN NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .check-in-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .top-nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .back-link {
      color: var(--text-muted);
      font-size: 0.88rem;
      font-weight: 500;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--text-primary);
      }
    }

    .event-selector-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .event-sel-label {
      font-size: 0.82rem;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .event-select {
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 6px 12px;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: var(--accent);
      }
    }

    .page-header {
      text-align: left;
    }

    .editorial-kicker {
      font-size: 0.72rem;
      font-weight: 700;
      color: #ff99aa;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }

    .page-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
    }

    .page-subtitle {
      font-size: 0.98rem;
      color: var(--text-secondary);
      margin: 0;
    }

    /* Gate Info Strip */
    .gate-info-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      padding: 14px 20px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
    }

    .gate-info-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .strip-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .strip-value {
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text-primary);

      &.highlight-text {
        color: #ffb3c1;
      }
    }

    /* Layout */
    .check-in-layout {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 24px;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .input-panel {
      padding: 24px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .mode-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      background: var(--bg-surface-elevated);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .mode-tab-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      font-size: 0.84rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--text-muted);
      border-radius: var(--radius-xs);
      transition: all var(--transition-fast);

      &.active {
        background: var(--accent);
        color: #ffffff;
      }
    }

    /* Camera Viewfinder */
    .camera-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .viewfinder-container {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;
      background: #000000;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-medium);
    }

    .camera-feed {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hidden-canvas {
      display: none;
    }

    .viewfinder-reticle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 220px;
      height: 220px;
      pointer-events: none;
    }

    .reticle-corner {
      position: absolute;
      width: 28px;
      height: 28px;
      border-color: #ff4d6d;
      border-style: solid;

      &.tl { top: 0; left: 0; border-width: 3px 0 0 3px; }
      &.tr { top: 0; right: 0; border-width: 3px 3px 0 0; }
      &.bl { bottom: 0; left: 0; border-width: 0 0 3px 3px; }
      &.br { bottom: 0; right: 0; border-width: 0 3px 3px 0; }
    }

    .laser-scanner-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #ff4d6d;
      box-shadow: 0 0 10px #ff4d6d;
      animation: scanLaser 2s ease-in-out infinite alternate;
    }

    @keyframes scanLaser {
      0% { top: 5%; }
      100% { top: 95%; }
    }

    .camera-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--text-muted);
      font-size: 0.9rem;
      background: rgba(18, 20, 23, 0.95);
    }

    .camera-error-banner {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 20px;
      text-align: center;
      background: rgba(40, 10, 15, 0.9);
      color: #ff99aa;
      font-size: 0.88rem;
    }

    .camera-controls {
      display: flex;
      justify-content: center;
    }

    /* Manual Form */
    .manual-code-section {
      padding: 10px 0;
    }

    .manual-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .input-with-button {
      display: flex;
      gap: 10px;
    }

    .code-input {
      flex: 1;
      padding: 14px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.08em;

      &:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 2px var(--accent-subtle);
      }
    }

    .validate-btn {
      padding: 14px 24px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    /* Demo Chips */
    .demo-seed-chips-card {
      padding-top: 14px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .chips-title {
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .chips-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .demo-chip {
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      font-family: monospace;
      font-size: 0.78rem;
      cursor: pointer;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      transition: all var(--transition-fast);

      &:hover {
        transform: translateY(-1px);
        border-color: var(--border-strong);
      }

      .chip-hint {
        color: var(--text-muted);
        font-family: var(--font-body);
        font-size: 0.72rem;
      }

      &.chip-valid {
        border-color: rgba(74, 222, 128, 0.3);
        &:hover { background: rgba(74, 222, 128, 0.1); }
      }

      &.chip-warning {
        border-color: rgba(251, 191, 36, 0.3);
        &:hover { background: rgba(251, 191, 36, 0.1); }
      }

      &.chip-error {
        border-color: rgba(239, 68, 68, 0.3);
        &:hover { background: rgba(239, 68, 68, 0.1); }
      }
    }

    /* Result Panel */
    .result-panel {
      position: sticky;
      top: 92px;
    }

    .result-placeholder {
      padding: 48px 24px;
      text-align: center;
      background: var(--bg-surface);
      border: 1px dashed var(--border-medium);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }

    .placeholder-icon {
      color: var(--text-muted);
    }

    .placeholder-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
    }

    .placeholder-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      max-width: 320px;
      margin: 0;
    }

    /* Result Cards */
    .result-card {
      padding: 32px 28px;
      background: var(--bg-surface);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 22px;
      border: 1px solid var(--border-medium);

      &.valid-card {
        border-color: rgba(74, 222, 128, 0.45);
        background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(74, 222, 128, 0.05) 100%);
      }

      &.used-card {
        border-color: rgba(245, 158, 11, 0.45);
        background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(245, 158, 11, 0.05) 100%);
      }

      &.invalid-card {
        border-color: rgba(239, 68, 68, 0.45);
        background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(239, 68, 68, 0.05) 100%);
      }

      &.success-card {
        border-color: rgba(74, 222, 128, 0.6);
        background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(74, 222, 128, 0.1) 100%);
      }
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);

      .status-symbol {
        font-size: 1.6rem;
        font-weight: 900;
      }

      .status-heading {
        font-size: 1.45rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        margin: 0;
      }

      &.valid-header {
        color: #4ade80;
      }

      &.used-header {
        color: #fbbf24;
      }

      &.invalid-header {
        color: #f87171;
      }

      &.success-header {
        color: #4ade80;
      }
    }

    .guest-info-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .guest-name {
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--text-primary);
    }

    .ticket-code-tag {
      font-family: monospace;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .warning-text {
      color: #fbbf24;
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }

    .error-text {
      color: #f87171;
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }

    .details-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--bg-surface-elevated);
      padding: 16px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }

    .detail-label {
      font-size: 0.82rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .detail-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-primary);
      text-align: right;

      &.highlight-pass {
        color: #ffb3c1;
        font-weight: 700;
      }

      &.status-ready {
        color: #4ade80;
        font-weight: 800;
        letter-spacing: 0.04em;
      }
    }

    .check-in-btn {
      font-weight: 800;
      letter-spacing: 0.06em;
      padding: 16px;
    }

    .scan-next-btn {
      font-weight: 800;
      letter-spacing: 0.06em;
      padding: 16px;
    }

    /* Success Card Content */
    .success-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
      padding: 12px 0;
    }

    .success-guest-name {
      font-size: 1.8rem;
      font-weight: 800;
      margin: 0;
      color: var(--text-primary);
    }

    .success-pass-type {
      font-size: 1.1rem;
      color: #ffb3c1;
      font-weight: 600;
      margin: 0;
    }

    .success-event-title {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .success-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.86rem;
      color: var(--text-muted);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
    }

    .fade-in {
      animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class StaffCheckInComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasRef?: ElementRef<HTMLCanvasElement>;

  readonly staffData = inject(StaffDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  activeTab: 'scan' | 'manual' = 'scan';
  manualCode = '';

  readonly selectedEventId = signal<string>('staff-event-001');
  readonly viewMode = signal<ValidationViewMode>('idle');
  validationResult: ValidationResult | null = null;
  successData: {
    guestName: string;
    passType: string;
    eventTitle: string;
    checkedInTime: string;
    gate: string;
  } | null = null;

  // Camera state
  readonly cameraActive = signal<boolean>(false);
  readonly cameraError = signal<string | null>(null);
  readonly isScanning = signal<boolean>(false);
  private mediaStream: MediaStream | null = null;
  private scanFrameRequestId: number | null = null;

  get selectedEvent(): StaffEvent | undefined {
    return this.staffData.getEventById(this.selectedEventId());
  }

  ngOnInit(): void {
    const qParamEvent = this.route.snapshot.queryParams['eventId'];
    if (qParamEvent && this.staffData.getEventById(qParamEvent)) {
      this.selectedEventId.set(qParamEvent);
    } else {
      const firstEvent = this.staffData.events()[0];
      if (firstEvent) {
        this.selectedEventId.set(firstEvent.id);
      }
    }

    // Auto-launch camera when on scan tab
    setTimeout(() => {
      if (this.activeTab === 'scan') {
        this.startCamera();
      }
    }, 200);
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  setTab(tab: 'scan' | 'manual'): void {
    this.activeTab = tab;
    if (tab === 'scan') {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  onEventChange(eventId: string): void {
    this.selectedEventId.set(eventId);
    if (this.viewMode() === 'result' && this.validationResult?.ticket) {
      // Re-validate against new event
      this.executeValidation(this.validationResult.ticket.ticketCode);
    }
  }

  applyDemoCode(code: string): void {
    this.manualCode = code;
    this.executeValidation(code);
  }

  handleManualValidate(): void {
    if (!this.manualCode.trim()) return;
    this.executeValidation(this.manualCode.trim());
  }

  private executeValidation(code: string): void {
    const result = this.staffData.validateTicket(code, this.selectedEventId());
    this.validationResult = result;
    this.viewMode.set('result');

    // If camera was scanning, pause scanning while result is displayed
    this.isScanning.set(false);

    if (result.outcome === 'VALID') {
      this.toast.success('Valid Pass', `${result.ticket?.guestName} — Ready for entry`);
    } else if (result.outcome === 'ALREADY_USED') {
      this.toast.info('Already Used', 'This ticket has already been checked in.');
      this.staffData.recordFailedAttempt(
        result.ticket?.guestName || 'Unknown Attendee',
        result.ticket?.passType || 'Standard Pass',
        result.ticket?.eventTitle || this.selectedEvent?.title || 'SpotBukk Event',
        'ALREADY USED',
        'Main Entrance',
        result.ticket?.ticketCode
      );
    } else if (result.outcome === 'CANCELLED') {
      this.toast.error('Cancelled Pass', 'This booking was cancelled.');
      this.staffData.recordFailedAttempt(
        result.ticket?.guestName || 'Unknown Attendee',
        result.ticket?.passType || 'Standard Pass',
        result.ticket?.eventTitle || this.selectedEvent?.title || 'SpotBukk Event',
        'CANCELLED',
        'Main Entrance',
        result.ticket?.ticketCode
      );
    } else if (result.outcome === 'EXPIRED') {
      this.toast.error('Expired Pass', 'This pass is no longer valid.');
    } else if (result.outcome === 'WRONG_EVENT') {
      this.toast.error('Wrong Event', `Ticket belongs to "${result.ticket?.eventTitle}"`);
      this.staffData.recordFailedAttempt(
        result.ticket?.guestName || 'Unknown Attendee',
        result.ticket?.passType || 'Standard Pass',
        result.ticket?.eventTitle || 'Other Event',
        'WRONG EVENT',
        'Main Entrance',
        result.ticket?.ticketCode
      );
    } else {
      this.toast.error('Invalid Ticket', 'Ticket code or QR could not be validated.');
    }
  }

  handleCheckInGuest(): void {
    if (!this.validationResult?.ticket) return;

    const ticket = this.validationResult.ticket;
    const confirmation = this.staffData.confirmCheckIn(ticket, 'Main Entrance');

    this.successData = {
      guestName: ticket.guestName,
      passType: ticket.passType,
      eventTitle: ticket.eventTitle,
      checkedInTime: confirmation.checkedInTime,
      gate: confirmation.gate
    };

    this.viewMode.set('success');
    this.toast.success('Entry Granted', `Welcome ${ticket.guestName}!`);
  }

  resetValidation(): void {
    this.viewMode.set('idle');
    this.validationResult = null;
    this.successData = null;
    this.manualCode = '';

    // If on camera tab, resume scanner loop
    if (this.activeTab === 'scan' && this.cameraActive()) {
      this.isScanning.set(true);
      this.requestNextFrame();
    }
  }

  // Camera implementation
  async startCamera(): Promise<void> {
    this.cameraError.set(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.cameraError.set('Camera access not supported on this device/browser.');
        return;
      }

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      if (this.videoRef?.nativeElement) {
        this.videoRef.nativeElement.srcObject = this.mediaStream;
        await this.videoRef.nativeElement.play();
        this.cameraActive.set(true);
        this.isScanning.set(true);
        this.requestNextFrame();
      }
    } catch (err: any) {
      this.cameraError.set(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in browser settings.'
          : 'Unable to access camera hardware.'
      );
      this.cameraActive.set(false);
    }
  }

  stopCamera(): void {
    if (this.scanFrameRequestId) {
      cancelAnimationFrame(this.scanFrameRequestId);
      this.scanFrameRequestId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.cameraActive.set(false);
    this.isScanning.set(false);
  }

  private requestNextFrame(): void {
    if (!this.cameraActive() || !this.isScanning()) return;
    this.scanFrameRequestId = requestAnimationFrame(() => this.scanFrame());
  }

  private scanFrame(): void {
    if (!this.cameraActive() || !this.isScanning()) return;

    const video = this.videoRef?.nativeElement;
    const canvas = this.canvasRef?.nativeElement;

    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data) {
          // Found QR payload!
          this.executeValidation(code.data);
          return;
        }
      }
    }

    this.requestNextFrame();
  }
}
