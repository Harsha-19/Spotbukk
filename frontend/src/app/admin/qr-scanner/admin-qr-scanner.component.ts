import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import jsQR from 'jsqr';

import { AuthService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event.service';
import { CheckInScanResult, Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

export type ScannerState =
  | 'unauthorized'
  | 'initializing'
  | 'scanning'
  | 'verifying'
  | 'verified'
  | 'used'
  | 'invalid'
  | 'camera_error';

@Component({
  selector: 'app-admin-qr-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="qr-scanner-page container">
      <!-- 1. UNAUTHORIZED / 403 STATE (NON-ADMIN PROTECTION) -->
      <div *ngIf="scannerState() === 'unauthorized'" class="unauth-barrier card-base">
        <div class="unauth-icon-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span class="editorial-kicker">Access Denied</span>
        <h2 class="barrier-title">403 Forbidden — Admin Only</h2>
        <p class="barrier-text">
          The camera hardware and QR validation engine are strictly restricted to authenticated Administrator accounts.
        </p>
        <div class="barrier-actions">
          <a routerLink="/login" [queryParams]="{ mode: 'admin', returnUrl: '/admin/scanner' }" class="btn btn-primary">
            Log In as Administrator
          </a>
          <a routerLink="/" class="btn btn-subtle">
            Return to Public Website
          </a>
        </div>
      </div>

      <!-- 2. ADMIN SCANNER WORKSPACE (RENDERED ONLY FOR ADMIN) -->
      <div *ngIf="authService.isAdmin() && scannerState() !== 'unauthorized'" class="scanner-shell">
        <!-- Top Navigation & Title Bar -->
        <div class="scanner-top-bar">
          <div class="bar-left">
            <span class="editorial-kicker">Curator Security Utility</span>
            <h1 class="page-title">Live QR Camera Scanner</h1>
            <p class="page-subtitle">
              High-speed real-time ticket admission scanner using device camera hardware.
            </p>
          </div>

          <div class="bar-right">
            <!-- Active Admin Badge -->
            <div class="admin-badge">
              <span class="status-dot green"></span>
              <span class="admin-text">
                {{ authService.currentUser()?.fullName }} (ADMIN)
              </span>
            </div>

            <!-- Close Scanner Button -->
            <button class="btn btn-subtle btn-sm" (click)="closeScanner()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Close Scanner
            </button>
          </div>
        </div>

        <!-- Main Scanner Grid -->
        <div class="scanner-layout-grid">
          <!-- Left Column: Camera Viewport -->
          <div class="camera-column">
            <div class="camera-viewport-card card-base">
              <!-- Live Video Feed Container -->
              <div class="video-stage" [class.is-torch-on]="isTorchOn">
                <video
                  #videoElement
                  class="live-video"
                  playsinline
                  muted
                  [class.hidden]="scannerState() === 'camera_error' || scannerState() === 'initializing'"
                ></video>

                <!-- Hidden Canvas for QR Frame Extraction -->
                <canvas #canvasElement class="hidden-canvas"></canvas>

                <!-- Initializing / Loading Indicator -->
                <div *ngIf="scannerState() === 'initializing'" class="viewport-placeholder">
                  <div class="spinner"></div>
                  <span class="placeholder-text">Requesting camera device permission...</span>
                </div>

                <!-- Camera Error Display -->
                <div *ngIf="scannerState() === 'camera_error'" class="camera-error-overlay">
                  <div class="error-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  </div>
                  <h3 class="error-title">Camera Unavailable</h3>
                  <p class="error-desc">{{ cameraErrorMessage }}</p>
                  <div class="error-btn-group">
                    <button class="btn btn-primary btn-sm" (click)="startCamera()">
                      Retry Camera Connection
                    </button>
                    <button class="btn btn-subtle btn-sm" (click)="closeScanner()">
                      Close Scanner
                    </button>
                  </div>
                </div>

                <!-- Viewfinder Overlay (When Camera is Active) -->
                <div
                  *ngIf="scannerState() === 'scanning' || scannerState() === 'verifying'"
                  class="viewfinder-overlay"
                >
                  <!-- 4 Targeting Corner Guides -->
                  <div class="corner-bracket corner-tl"></div>
                  <div class="corner-bracket corner-tr"></div>
                  <div class="corner-bracket corner-bl"></div>
                  <div class="corner-bracket corner-br"></div>

                  <!-- Animated Laser Sweep Line -->
                  <div class="laser-scanner-beam" [class.scanning]="scannerState() === 'scanning'"></div>

                  <!-- Center Target Tag -->
                  <div class="targeting-badge">
                    <span class="badge-text">
                      {{ scannerState() === 'verifying' ? 'DECODING QR...' : 'ALIGN QR WITHIN SIGHT' }}
                    </span>
                  </div>
                </div>

                <!-- Live Camera Controls Bar (Overlaid on bottom of video) -->
                <div
                  *ngIf="scannerState() === 'scanning' || scannerState() === 'verifying'"
                  class="camera-controls-bar"
                >
                  <!-- Torch Toggle -->
                  <button
                    *ngIf="hasTorchSupport"
                    type="button"
                    class="cam-tool-btn"
                    [class.active]="isTorchOn"
                    (click)="toggleTorch()"
                    title="Toggle Flash / Torch"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span>{{ isTorchOn ? 'Torch On' : 'Torch Off' }}</span>
                  </button>

                  <!-- Camera Switch Toggle -->
                  <button
                    *ngIf="videoDevices.length > 1"
                    type="button"
                    class="cam-tool-btn"
                    (click)="switchCamera()"
                    title="Switch Camera Device"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>
                      <polyline points="15 2 20 2 20 7"/>
                      <line x1="20" y1="2" x2="14" y2="8"/>
                    </svg>
                    <span>Switch Camera</span>
                  </button>

                  <div class="gate-indicator">
                    <span>Gate 01 · Door Clearance</span>
                  </div>
                </div>
              </div>

              <!-- Manual Barcode Code Entry Fallback -->
              <div class="manual-input-strip">
                <span class="manual-lbl">Manual Override:</span>
                <div class="manual-form">
                  <input
                    type="text"
                    [(ngModel)]="manualCodeInput"
                    (keyup.enter)="verifyManualCode()"
                    placeholder="Enter Ticket Code or Booking ID (e.g. TKT-77312-VIP)..."
                    class="form-control manual-field"
                  />
                  <button class="btn btn-primary btn-sm" (click)="verifyManualCode()">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Verification Result & Status Ledger -->
          <div class="result-column">
            <!-- Active State Cards -->
            <div class="status-display-card card-base">
              <!-- STATE: SCANNING IN PROGRESS -->
              <div *ngIf="scannerState() === 'scanning'" class="state-panel scanning-panel">
                <div class="radar-pulse-wrap">
                  <div class="pulse-ring ring-1"></div>
                  <div class="pulse-ring ring-2"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M3 12a9 9 0 0 1 9-9"/>
                    <path d="M21 12a9 9 0 0 1-9 9"/>
                  </svg>
                </div>
                <h3 class="panel-headline">Ready for Barcode</h3>
                <p class="panel-body">
                  Position attendee's phone screen or printed pass in front of camera lens. QR detection occurs automatically in real time.
                </p>
                <div class="door-status-pill">
                  <span class="pulse-dot green"></span>
                  <span>Sensor Active · Waiting for Attendee</span>
                </div>
              </div>

              <!-- STATE: VERIFYING IN PROGRESS -->
              <div *ngIf="scannerState() === 'verifying'" class="state-panel verifying-panel">
                <div class="spinner large"></div>
                <h3 class="panel-headline">Authorizing Pass...</h3>
                <p class="panel-body">
                  Running cryptographic signature validation and duplicate admission verification against backend ledger.
                </p>
              </div>

              <!-- STATE: VERIFIED (SUCCESSFUL SCAN) -->
              <div *ngIf="scannerState() === 'verified'" class="state-panel verified-panel">
                <div class="outcome-badge success">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>ENTRY GRANTED</span>
                </div>

                <h3 class="outcome-title text-success">Admitted Successfully</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <!-- Ticket Particulars Card -->
                <div *ngIf="scanResult?.ticket as t" class="ticket-details-box">
                  <div class="detail-row highlight">
                    <span class="d-label">Admitted Guest</span>
                    <span class="d-val strong">{{ t.customer.fullName }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Pass Reference</span>
                    <span class="d-val font-mono">{{ t.ticketCode }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Gathering</span>
                    <span class="d-val">{{ t.eventTitle }} ({{ t.eventEdition }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Tier & Party Size</span>
                    <span class="d-val">{{ t.ticketTierName }} ({{ t.quantity }} Passes)</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Clearance Time</span>
                    <span class="d-val">{{ scanResult?.scanTime }}</span>
                  </div>
                  <div *ngIf="t.additionalGuests && t.additionalGuests.length > 0" class="detail-row">
                    <span class="d-label">Guests in Party</span>
                    <span class="d-val">{{ t.additionalGuests.join(', ') }}</span>
                  </div>
                </div>

                <!-- Action Button: Scan Next -->
                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 4v6h-6"/>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                    Scan Next Pass
                  </button>
                </div>
              </div>

              <!-- STATE: USED (DUPLICATE ENTRY DETECTED) -->
              <div *ngIf="scannerState() === 'used'" class="state-panel used-panel">
                <div class="outcome-badge warning">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>DUPLICATE ADMISSION BLOCKED</span>
                </div>

                <h3 class="outcome-title text-warning">Ticket Already Used</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <div *ngIf="scanResult?.ticket as t" class="ticket-details-box alert-box">
                  <div class="detail-row">
                    <span class="d-label">Registered Guest:</span>
                    <span class="d-val strong">{{ t.customer.fullName }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">Ticket Code:</span>
                    <span class="d-val font-mono">{{ t.ticketCode }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="d-label">First Check-In:</span>
                    <span class="d-val text-warning">{{ t.checkedInTime | date:'mediumTime' }}</span>
                  </div>
                </div>

                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    Scan Another Pass
                  </button>
                </div>
              </div>

              <!-- STATE: INVALID / TAMPERED TICKET -->
              <div *ngIf="scannerState() === 'invalid'" class="state-panel invalid-panel">
                <div class="outcome-badge error">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span>ENTRY REJECTED</span>
                </div>

                <h3 class="outcome-title text-error">Unrecognized Barcode</h3>
                <p class="outcome-msg">{{ scanResult?.message }}</p>

                <p class="invalid-sub-hint">
                  The scanned payload does not match any valid ticket registration record in the organizer database.
                </p>

                <div class="scan-action-wrap">
                  <button class="btn btn-primary btn-block" (click)="resetForNextScan()">
                    Scan Again
                  </button>
                </div>
              </div>
            </div>

            <!-- Door Metrics Strip -->
            <div class="metrics-strip card-base">
              <div class="metric-item">
                <span class="m-lbl">Door Admitted</span>
                <span class="m-val text-accent">{{ eventService.totalCheckedIn() }}</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="m-lbl">Sold Capacity</span>
                <span class="m-val">{{ eventService.totalTicketsSold() }}</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="m-lbl">Clearance Rate</span>
                <span class="m-val">
                  {{
                    eventService.totalTicketsSold() > 0
                      ? ((eventService.totalCheckedIn() / eventService.totalTicketsSold()) * 100).toFixed(0) + '%'
                      : '0%'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-scanner-page {
      padding: 30px 20px 60px;
      min-height: calc(100vh - 120px);
    }

    .unauth-barrier {
      max-width: 500px;
      margin: 80px auto;
      padding: 40px;
      text-align: center;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
    }

    .unauth-icon-wrap {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.15);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .barrier-title {
      font-size: 1.5rem;
      margin: 8px 0 12px;
    }

    .barrier-text {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .barrier-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .scanner-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }

    .page-title {
      font-size: 1.75rem;
      letter-spacing: -0.02em;
      margin: 4px 0 6px;
    }

    .page-subtitle {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .bar-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .admin-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: var(--radius-full);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;

      &.green {
        background: #68c49e;
        box-shadow: 0 0 8px rgba(104, 196, 158, 0.5);
      }
    }

    .scanner-layout-grid {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 24px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .camera-viewport-card {
      padding: 16px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .video-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #000000;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .live-video {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.hidden {
        display: none;
      }
    }

    .hidden-canvas {
      display: none;
    }

    .viewport-placeholder,
    .camera-error-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      text-align: center;
      background: #09090b;
      z-index: 10;
    }

    .placeholder-text {
      margin-top: 16px;
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .error-icon {
      color: #e87b7b;
      margin-bottom: 12px;
    }

    .error-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .error-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
      max-width: 360px;
      margin-bottom: 20px;
    }

    .error-btn-group {
      display: flex;
      gap: 10px;
    }

    /* Viewfinder targeting overlay */
    .viewfinder-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 240px;
      pointer-events: none;
      z-index: 5;
    }

    .corner-bracket {
      position: absolute;
      width: 28px;
      height: 28px;
      border: 3px solid var(--accent);

      &.corner-tl {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
        border-top-left-radius: 8px;
      }

      &.corner-tr {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
        border-top-right-radius: 8px;
      }

      &.corner-bl {
        bottom: 0;
        left: 0;
        border-right: none;
        border-top: none;
        border-bottom-left-radius: 8px;
      }

      &.corner-br {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
        border-bottom-right-radius: 8px;
      }
    }

    .laser-scanner-beam {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ff3366, #ffffff, #ff3366, transparent);
      box-shadow: 0 0 12px #ff3366;
      opacity: 0;

      &.scanning {
        opacity: 1;
        animation: beamSweep 2.2s infinite ease-in-out;
      }
    }

    @keyframes beamSweep {
      0% { top: 5%; }
      50% { top: 95%; }
      100% { top: 5%; }
    }

    .targeting-badge {
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid var(--border-medium);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      font-weight: 700;
      color: var(--text-primary);
    }

    .camera-controls-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px 14px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 6;
    }

    .cam-tool-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-size: 0.75rem;
      cursor: pointer;

      &.active {
        background: var(--accent);
        border-color: var(--accent);
      }
    }

    .gate-indicator {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 500;
    }

    .manual-input-strip {
      padding: 12px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .manual-lbl {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 700;
    }

    .manual-form {
      display: flex;
      gap: 8px;
    }

    .manual-field {
      flex: 1;
      font-size: 0.85rem;
      padding: 8px 12px;
    }

    /* Result column card */
    .status-display-card {
      padding: 28px;
      min-height: 380px;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .state-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .panel-headline {
      font-size: 1.35rem;
      margin: 16px 0 8px;
    }

    .panel-body {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      max-width: 380px;
      margin-bottom: 20px;
    }

    .radar-pulse-wrap {
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.15);
      border: 1px solid var(--accent);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pulse-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid var(--accent);
      opacity: 0.4;
      animation: pulseAnim 2s infinite ease-out;

      &.ring-2 {
        inset: -16px;
        animation-delay: 0.6s;
      }
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.9); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .door-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      color: var(--text-secondary);
    }

    .outcome-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 12px;

      &.success {
        background: rgba(104, 196, 158, 0.15);
        border: 1px solid rgba(104, 196, 158, 0.4);
        color: #68c49e;
      }

      &.warning {
        background: rgba(230, 178, 104, 0.15);
        border: 1px solid rgba(230, 178, 104, 0.4);
        color: #e6b268;
      }

      &.error {
        background: rgba(232, 123, 123, 0.15);
        border: 1px solid rgba(232, 123, 123, 0.4);
        color: #e87b7b;
      }
    }

    .outcome-title {
      font-size: 1.5rem;
      margin-bottom: 6px;

      &.text-success { color: #68c49e; }
      &.text-warning { color: #e6b268; }
      &.text-error   { color: #e87b7b; }
    }

    .outcome-msg {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .ticket-details-box {
      width: 100%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      text-align: left;
      font-size: 0.82rem;
      margin-bottom: 20px;

      &.alert-box {
        border-color: rgba(230, 178, 104, 0.3);
      }
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }

      &.highlight {
        .d-val {
          color: var(--text-primary);
          font-size: 0.95rem;
        }
      }
    }

    .d-label {
      color: var(--text-muted);
    }

    .d-val {
      color: var(--text-secondary);

      &.strong {
        font-weight: 700;
      }
    }

    .scan-action-wrap {
      width: 100%;
    }

    .btn-block {
      width: 100%;
      justify-content: center;
      padding: 12px;
    }

    .metrics-strip {
      margin-top: 16px;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .m-lbl {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .m-val {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .metric-divider {
      width: 1px;
      height: 24px;
      background: var(--border-subtle);
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;

      &.large {
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AdminQrScannerComponent implements OnInit, OnDestroy {
  readonly authService = inject(AuthService);
  readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  @ViewChild('videoElement') videoElementRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElementRef?: ElementRef<HTMLCanvasElement>;

  readonly scannerState = signal<ScannerState>('initializing');
  scanResult: CheckInScanResult | null = null;
  cameraErrorMessage = '';

  private mediaStream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  private isProcessingFrame = false;

  manualCodeInput = '';
  isTorchOn = false;
  hasTorchSupport = false;

  videoDevices: MediaDeviceInfo[] = [];
  selectedDeviceIndex = 0;

  ngOnInit(): void {
    this.checkAdminAccess();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  checkAdminAccess(): void {
    if (!this.authService.isAdmin()) {
      this.scannerState.set('unauthorized');
      return;
    }

    this.scannerState.set('initializing');
    // Start camera when component loads for authenticated Admin
    setTimeout(() => {
      this.startCamera();
    }, 100);
  }

  async startCamera(): Promise<void> {
    this.stopCamera();
    this.scannerState.set('initializing');
    this.cameraErrorMessage = '';

    // Verify browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.cameraErrorMessage =
        'Camera API is not supported by this browser. Please use modern Chrome, Safari, or Edge.';
      this.scannerState.set('camera_error');
      return;
    }

    try {
      // Query available video devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(d => d.kind === 'videoinput');

      // Request camera with back/environment camera preference
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err: any) {
        // Fallback constraint if environment facingMode fails
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      this.mediaStream = stream;

      // Check torch capability
      const track = stream.getVideoTracks()[0];
      if (track) {
        const capabilities = (track as any).getCapabilities?.() || {};
        this.hasTorchSupport = !!capabilities.torch;
      }

      // Attach to video element
      const video = this.videoElementRef?.nativeElement;
      if (video) {
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');
        await video.play();

        this.scannerState.set('scanning');
        this.startDetectionLoop();
      }
    } catch (err: any) {
      this.handleCameraError(err);
    }
  }

  private handleCameraError(error: any): void {
    console.error('Camera access error:', error);
    const errName = error.name || '';

    if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
      this.cameraErrorMessage =
        'Camera permission was denied. Please allow camera permissions in your browser address bar settings to scan attendee passes.';
    } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
      this.cameraErrorMessage =
        'No camera device found on this system. Please connect a webcam or use a mobile device.';
    } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
      this.cameraErrorMessage =
        'Camera is currently in use by another application or operating system process. Please close other camera apps and retry.';
    } else if (errName === 'OverconstrainedError') {
      this.cameraErrorMessage =
        'Requested camera resolution is not supported by your camera hardware.';
    } else {
      this.cameraErrorMessage =
        error.message || 'Unable to start camera stream. Please check permissions and device availability.';
    }

    this.scannerState.set('camera_error');
  }

  private startDetectionLoop(): void {
    const loop = async () => {
      if (this.scannerState() !== 'scanning') {
        return;
      }

      await this.scanCurrentFrame();
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  private async scanCurrentFrame(): Promise<void> {
    if (this.isProcessingFrame) return;

    const video = this.videoElementRef?.nativeElement;
    const canvas = this.canvasElementRef?.nativeElement;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }

    this.isProcessingFrame = true;

    try {
      // 1. Native BarcodeDetector API if available
      if ('BarcodeDetector' in window) {
        try {
          const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
          const barcodes = await detector.detect(video);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            await this.onBarcodeDetected(barcodes[0].rawValue);
            this.isProcessingFrame = false;
            return;
          }
        } catch {
          // Fall through to jsQR
        }
      }

      // 2. jsQR Canvas Decoder Fallback
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data && code.data.trim()) {
          await this.onBarcodeDetected(code.data.trim());
          this.isProcessingFrame = false;
          return;
        }
      }
    } catch (e) {
      // Ignore transient frame errors
    } finally {
      this.isProcessingFrame = false;
    }
  }

  async onBarcodeDetected(payload: string): Promise<void> {
    // Stop continuous frame scanning
    this.scannerState.set('verifying');
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    try {
      // Pass scanned QR data to backend verification API
      const result = await this.eventService.verifyTicketWithBackend(payload);
      this.scanResult = result;

      if (result.status === 'verified') {
        this.scannerState.set('verified');
        this.toast.success(
          'Pass Admitted',
          `${result.ticket?.customer?.fullName || 'Guest'} checked in.`
        );
      } else if (result.status === 'used') {
        this.scannerState.set('used');
        this.toast.warning('Duplicate Ticket', 'This ticket has already been checked in.');
      } else {
        this.scannerState.set('invalid');
        this.toast.error('Invalid Ticket', result.message);
      }
    } catch (err: any) {
      this.scannerState.set('invalid');
      this.scanResult = {
        status: 'invalid',
        message: 'Network verification error. Please retry.',
        scanTime: new Date().toLocaleTimeString(),
        gate: 'Gate 01'
      };
    }
  }

  async verifyManualCode(): Promise<void> {
    const code = this.manualCodeInput.trim();
    if (!code) {
      this.toast.warning('Input Required', 'Please enter a ticket code or booking reference.');
      return;
    }

    this.scannerState.set('verifying');
    await this.onBarcodeDetected(code);
    this.manualCodeInput = '';
  }

  resetForNextScan(): void {
    this.scanResult = null;
    this.scannerState.set('scanning');
    this.startDetectionLoop();
  }

  async toggleTorch(): Promise<void> {
    if (!this.mediaStream) return;
    const track = this.mediaStream.getVideoTracks()[0];
    if (track) {
      try {
        this.isTorchOn = !this.isTorchOn;
        await (track as any).applyConstraints({
          advanced: [{ torch: this.isTorchOn }]
        });
      } catch (err) {
        console.warn('Torch constraint failed:', err);
      }
    }
  }

  async switchCamera(): Promise<void> {
    if (this.videoDevices.length <= 1) return;
    this.selectedDeviceIndex = (this.selectedDeviceIndex + 1) % this.videoDevices.length;
    await this.startCamera();
  }

  stopCamera(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      this.mediaStream = null;
    }

    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.srcObject = null;
    }
  }

  closeScanner(): void {
    this.stopCamera();
    this.router.navigate(['/admin/checkins']);
  }
}
