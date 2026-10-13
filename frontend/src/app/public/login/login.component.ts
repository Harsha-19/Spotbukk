import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type LoginMode = 'options' | 'phone' | 'email' | 'admin' | 'staff';
type VerificationStep = 'input' | 'otp';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-backdrop-glow"></div>

      <div class="login-container">
        <!-- Main Login Card -->
        <div class="login-card glass-panel">
          
          <!-- Logo & Header -->
          <div class="card-header">
            <a routerLink="/" class="brand-logo-link" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk Logo" class="login-logo-img" />
            </a>

            <!-- Mode-dependent Titles -->
            <div *ngIf="mode() !== 'admin' && mode() !== 'staff'" class="header-titles">
              <h1 class="welcome-title">Welcome Back</h1>
              <p class="welcome-subtitle">Sign in to continue</p>
            </div>

            <div *ngIf="mode() === 'staff'" class="header-titles">
              <div class="admin-badge">
                <span class="security-dot"></span>
                Venue Operations Portal
              </div>
              <h1 class="welcome-title">Staff Sign In</h1>
              <p class="welcome-subtitle">Door clearance & check-in personnel</p>
            </div>

            <div *ngIf="mode() === 'admin'" class="header-titles">
              <div class="admin-badge">
                <span class="security-dot"></span>
                Curator Security Portal
              </div>
              <h1 class="welcome-title">Administrator Sign In</h1>
              <p class="welcome-subtitle">Authorized personnel & organizers only</p>
            </div>
          </div>

          <!-- Alert / Error Banner -->
          <div *ngIf="errorMessage()" class="alert-banner alert-error" role="alert">
            <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="alert-text">{{ errorMessage() }}</span>
          </div>

          <!-- Success Banner -->
          <div *ngIf="successMessage()" class="alert-banner alert-success" role="alert">
            <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span class="alert-text">{{ successMessage() }}</span>
          </div>

          <!-- ======================================================== -->
          <!-- 1. OPTIONS VIEW: Google, Phone, Email Buttons            -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'options'" class="view-content fade-in">
            
            <!-- OPTION 1: Continue with Google -->
            <button
              type="button"
              id="btn-google-login"
              class="auth-provider-btn google-btn"
              (click)="handleGoogleLogin()"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon google-svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span class="btn-text">Continue with Google</span>
              <span *ngIf="isGoogleLoading()" class="btn-spinner"></span>
            </button>

            <!-- OR Divider -->
            <div class="auth-divider">
              <span class="divider-line"></span>
              <span class="divider-text">OR</span>
              <span class="divider-line"></span>
            </div>

            <!-- OPTION 2: Continue with Phone -->
            <button
              type="button"
              id="btn-phone-option"
              class="auth-provider-btn option-btn"
              (click)="switchToMode('phone')"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <span class="btn-text">Continue with Phone Number</span>
              <span class="chevron-arrow">&rarr;</span>
            </button>

            <!-- OPTION 3: Continue with Email -->
            <button
              type="button"
              id="btn-email-option"
              class="auth-provider-btn option-btn"
              (click)="switchToMode('email')"
              [disabled]="isLoading()"
            >
              <svg class="provider-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span class="btn-text">Continue with Email</span>
              <span class="chevron-arrow">&rarr;</span>
            </button>

            <!-- Switcher to Staff and Admin Sign In -->
            <div class="card-footer-switch">
              <span class="curator-text">Staff or Organizer?</span>
              <div style="display: flex; justify-content: center; gap: 12px; align-items: center;">
                <button type="button" class="admin-link-btn" (click)="switchToMode('staff')">
                  Staff Portal &rarr;
                </button>
                <span style="color: var(--text-muted);">&bull;</span>
                <button type="button" class="admin-link-btn" (click)="switchToMode('admin')">
                  Admin Portal &rarr;
                </button>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 2. PHONE NUMBER LOGIN FLOW                                -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'phone'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Back to all options
            </button>

            <!-- Step A: Enter Phone Number -->
            <div *ngIf="phoneStep() === 'input'">
              <div class="step-desc">
                Enter your mobile number to receive a 6-digit one-time verification code.
              </div>

              <form (ngSubmit)="handleSendPhoneOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="phone-input">Phone Number</label>
                  <div class="phone-input-wrap">
                    <span class="phone-prefix">+91</span>
                    <input
                      id="phone-input"
                      type="tel"
                      [(ngModel)]="phoneNumber"
                      name="phoneNumber"
                      placeholder="98765 43210"
                      class="form-control phone-field"
                      autocomplete="tel"
                      maxlength="14"
                      required
                    />
                  </div>
                  <span class="field-hint">Indian (+91) & International formats supported</span>
                </div>

                <button
                  type="submit"
                  id="btn-send-phone-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || !phoneNumber.trim()"
                >
                  <span *ngIf="!isLoading()">Send Verification Code</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Sending SMS...
                  </span>
                </button>
              </form>
            </div>

            <!-- Step B: Enter Phone OTP -->
            <div *ngIf="phoneStep() === 'otp'" class="otp-view">
              <div class="step-desc">
                Enter the 6-digit code sent to <strong class="text-contrast">+91 {{ phoneNumber }}</strong>
              </div>

              <form (ngSubmit)="handleVerifyPhoneOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="phone-otp-input">Verification Code</label>
                  <input
                    id="phone-otp-input"
                    type="text"
                    [(ngModel)]="phoneOtp"
                    name="phoneOtp"
                    placeholder="Enter 6-digit code"
                    class="form-control text-center otp-input-field"
                    autocomplete="one-time-code"
                    maxlength="6"
                    required
                  />
                </div>

                <div class="resend-row">
                  <span *ngIf="phoneTimer() > 0" class="cooldown-text">
                    Resend code in <strong>{{ phoneTimer() }}s</strong>
                  </span>
                  <button
                    *ngIf="phoneTimer() === 0"
                    type="button"
                    class="resend-btn"
                    (click)="handleSendPhoneOtp()"
                    [disabled]="isLoading()"
                  >
                    Resend Code
                  </button>
                  <button type="button" class="change-entry-btn" (click)="phoneStep.set('input')">
                    Edit Phone Number
                  </button>
                </div>

                <button
                  type="submit"
                  id="btn-verify-phone-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || phoneOtp.length < 6"
                >
                  <span *ngIf="!isLoading()">Verify & Sign In</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Verifying...
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 3. EMAIL LOGIN FLOW                                      -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'email'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Back to all options
            </button>

            <!-- Step A: Enter Email -->
            <div *ngIf="emailStep() === 'input'">
              <div class="step-desc">
                Enter your email address to receive a secure login verification code.
              </div>

              <form (ngSubmit)="handleSendEmailOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="email-input">Email Address</label>
                  <input
                    id="email-input"
                    type="email"
                    [(ngModel)]="emailAddress"
                    name="emailAddress"
                    placeholder="curator@example.com"
                    class="form-control"
                    autocomplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  id="btn-send-email-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || !emailAddress.trim()"
                >
                  <span *ngIf="!isLoading()">Send Verification Code</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Dispatching Code...
                  </span>
                </button>
              </form>
            </div>

            <!-- Step B: Enter Email OTP -->
            <div *ngIf="emailStep() === 'otp'" class="otp-view">
              <div class="step-desc">
                We sent a 6-digit code to <strong class="text-contrast">{{ emailAddress }}</strong>
              </div>

              <form (ngSubmit)="handleVerifyEmailOtp()" class="auth-form">
                <div class="form-group">
                  <label class="form-label" for="email-otp-input">Verification Code</label>
                  <input
                    id="email-otp-input"
                    type="text"
                    [(ngModel)]="emailOtp"
                    name="emailOtp"
                    placeholder="Enter 6-digit code"
                    class="form-control text-center otp-input-field"
                    autocomplete="one-time-code"
                    maxlength="6"
                    required
                  />
                </div>

                <div class="resend-row">
                  <span *ngIf="emailTimer() > 0" class="cooldown-text">
                    Resend code in <strong>{{ emailTimer() }}s</strong>
                  </span>
                  <button
                    *ngIf="emailTimer() === 0"
                    type="button"
                    class="resend-btn"
                    (click)="handleSendEmailOtp()"
                    [disabled]="isLoading()"
                  >
                    Resend Code
                  </button>
                  <button type="button" class="change-entry-btn" (click)="emailStep.set('input')">
                    Change Email
                  </button>
                </div>

                <button
                  type="submit"
                  id="btn-verify-email-otp"
                  class="btn btn-primary btn-block submit-btn"
                  [disabled]="isLoading() || emailOtp.length < 6"
                >
                  <span *ngIf="!isLoading()">Verify & Sign In</span>
                  <span *ngIf="isLoading()" class="btn-spinner-text">
                    <span class="btn-spinner"></span> Verifying...
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- 4. ADMINISTRATOR PORTAL SIGN IN                          -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'admin'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Return to Attendee Sign In
            </button>

            <form (ngSubmit)="handleAdminLogin()" class="auth-form admin-form">
              <div class="form-group">
                <label class="form-label" for="admin-email">Administrator Email</label>
                <input
                  id="admin-email"
                  type="email"
                  [(ngModel)]="adminEmail"
                  name="adminEmail"
                  placeholder="admin@spotbukk.com"
                  class="form-control"
                  autocomplete="username"
                  required
                />
              </div>

              <div class="form-group">
                <div class="label-with-hint">
                  <label class="form-label" for="admin-password">Security Password / Key</label>
                </div>
                <div class="password-input-wrap">
                  <input
                    id="admin-password"
                    [type]="showPassword ? 'text' : 'password'"
                    [(ngModel)]="adminPassword"
                    name="adminPassword"
                    placeholder="Enter security password"
                    class="form-control"
                    autocomplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    class="toggle-pwd-btn"
                    (click)="showPassword = !showPassword"
                    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                  >
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
              </div>

              <div class="admin-notice-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Curator privileges are verified strictly on the SpotBukk security server. Client role forging is prohibited.</span>
              </div>

              <button
                type="submit"
                id="btn-admin-submit"
                class="btn btn-primary btn-block submit-btn admin-submit"
                [disabled]="isLoading() || !adminEmail.trim() || !adminPassword.trim()"
              >
                <span *ngIf="!isLoading()">Authenticate as Administrator</span>
                <span *ngIf="isLoading()" class="btn-spinner-text">
                  <span class="btn-spinner"></span> Verifying Security Clearance...
                </span>
              </button>

            </form>
          </div>

          <!-- ======================================================== -->
          <!-- 5. STAFF PORTAL SIGN IN                                  -->
          <!-- ======================================================== -->
          <div *ngIf="mode() === 'staff'" class="view-content fade-in">
            <button type="button" class="back-link-btn" (click)="switchToMode('options')">
              &larr; Return to Attendee Sign In
            </button>

            <form (ngSubmit)="handleStaffLogin()" class="auth-form admin-form">
              <div class="form-group">
                <label class="form-label" for="staff-email">Staff Email</label>
                <input
                  id="staff-email"
                  type="email"
                  [(ngModel)]="staffEmail"
                  name="staffEmail"
                  placeholder="staff@spotbukk.com"
                  class="form-control"
                  autocomplete="username"
                  required
                />
              </div>

              <div class="form-group">
                <div class="label-with-hint">
                  <label class="form-label" for="staff-password">Staff Access Key / Password</label>
                </div>
                <div class="password-input-wrap">
                  <input
                    id="staff-password"
                    [type]="showStaffPassword ? 'text' : 'password'"
                    [(ngModel)]="staffPassword"
                    name="staffPassword"
                    placeholder="Enter staff password"
                    class="form-control"
                    autocomplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    class="toggle-pwd-btn"
                    (click)="showStaffPassword = !showStaffPassword"
                    [attr.aria-label]="showStaffPassword ? 'Hide password' : 'Show password'"
                  >
                    {{ showStaffPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
              </div>

              <div class="admin-notice-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Staff privileges grant door check-in & event operation clearance only. Administrative controls are restricted.</span>
              </div>

              <button
                type="submit"
                id="btn-staff-submit-main"
                class="btn btn-primary btn-block submit-btn admin-submit"
                [disabled]="isLoading() || !staffEmail.trim() || !staffPassword.trim()"
              >
                <span *ngIf="!isLoading()">Authenticate as Staff</span>
                <span *ngIf="isLoading()" class="btn-spinner-text">
                  <span class="btn-spinner"></span> Verifying Staff Credentials...
                </span>
              </button>

              <div class="demo-creds-hint">
                <span>Default test staff credentials:</span>
                <code>staff&#64;spotbukk.com / SpotBukkStaff2026!</code>
              </div>
            </form>
          </div>

        </div>

        <!-- Security Footer -->
        <div class="login-footer-info">
          <span>Protected by SpotBukk End-to-End Cryptographic Clearance Protocol</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 140px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      position: relative;
      background: var(--bg-page);
    }

    .login-backdrop-glow {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(128, 0, 32, 0.22) 0%, rgba(128, 0, 32, 0.05) 50%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(40px);
    }

    .login-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 460px;
      margin: 0 auto;
    }

    .login-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 40px 32px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(12px);
    }

    .card-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .brand-logo-link {
      display: inline-block;
      margin-bottom: 20px;
      transition: transform var(--transition-fast);
      &:hover { transform: scale(1.03); }
    }

    .login-logo-img {
      height: 58px;
      width: auto;
      max-width: 150px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      border-radius: var(--radius-xs);
    }

    .welcome-title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 6px;
      letter-spacing: -0.02em;
    }

    .welcome-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .admin-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(128, 0, 32, 0.25);
      border: 1px solid rgba(128, 0, 32, 0.45);
      color: #ff9999;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    .security-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff4d4d;
      box-shadow: 0 0 8px #ff4d4d;
    }

    /* Alerts */
    .alert-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      margin-bottom: 20px;
      font-size: 0.88rem;
      line-height: 1.4;
    }

    .alert-error {
      background: rgba(163, 44, 44, 0.18);
      border: 1px solid rgba(163, 44, 44, 0.45);
      color: #fca5a5;
    }

    .alert-success {
      background: rgba(46, 117, 89, 0.18);
      border: 1px solid rgba(46, 117, 89, 0.45);
      color: #86efac;
    }

    .alert-icon {
      flex-shrink: 0;
    }

    /* Provider Buttons */
    .view-content {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .auth-provider-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      font-size: 0.96rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid var(--border-medium);
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      text-align: center;
      position: relative;

      &:hover:not(:disabled) {
        border-color: var(--border-strong);
        background: var(--bg-surface-subtle);
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .google-btn {
      background: #ffffff;
      color: #1f1f1f;
      border-color: #dadce0;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

      &:hover:not(:disabled) {
        background: #f8f9fa;
        border-color: #c1c3c7;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
      }
    }

    .google-svg {
      flex-shrink: 0;
    }

    .option-btn {
      justify-content: flex-start;
      padding-left: 20px;
      padding-right: 20px;

      .btn-text {
        flex: 1;
        text-align: left;
      }

      .chevron-arrow {
        font-size: 1.1rem;
        color: var(--text-muted);
        transition: transform var(--transition-fast);
      }

      &:hover .chevron-arrow {
        transform: translateX(3px);
        color: var(--text-primary);
      }
    }

    /* Divider */
    .auth-divider {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 8px 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: var(--border-medium);
    }

    .divider-text {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.1em;
    }

    /* Footer switch to admin */
    .card-footer-switch {
      text-align: center;
      padding-top: 14px;
      margin-top: 6px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .curator-text {
      color: var(--text-muted);
    }

    .admin-link-btn {
      background: none;
      border: none;
      color: #d16b80;
      font-weight: 600;
      cursor: pointer;
      transition: color var(--transition-fast);
      text-decoration: underline;
      text-underline-offset: 3px;

      &:hover {
        color: #ff9999;
      }
    }

    .back-link-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.86rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      padding: 0;
      margin-bottom: 6px;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--text-primary);
      }
    }

    .step-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .text-contrast {
      color: var(--text-primary);
    }

    /* Forms */
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .label-with-hint {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-control {
      width: 100%;
      padding: 12px 14px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-size: 0.96rem;
      transition: border-color var(--transition-fast);

      &:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-subtle);
      }
    }

    .phone-input-wrap {
      display: flex;
      align-items: center;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      overflow: hidden;

      &:focus-within {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-subtle);
      }
    }

    .phone-prefix {
      padding: 12px 14px;
      background: var(--bg-surface-elevated);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.92rem;
      border-right: 1px solid var(--border-medium);
    }

    .phone-field {
      border: none;
      background: transparent;
      &:focus { box-shadow: none; }
    }

    .field-hint {
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .password-input-wrap {
      position: relative;
    }

    .toggle-pwd-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.82rem;
      cursor: pointer;
      &:hover { color: var(--text-primary); }
    }

    .otp-input-field {
      font-size: 1.5rem;
      letter-spacing: 0.3em;
      font-family: monospace;
      font-weight: 700;
      padding: 14px;
    }

    .resend-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.84rem;
    }

    .cooldown-text {
      color: var(--text-muted);
    }

    .resend-btn {
      background: none;
      border: none;
      color: #d16b80;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      &:hover { color: #ff9999; }
    }

    .change-entry-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0;
      &:hover { color: var(--text-primary); }
    }

    .submit-btn {
      padding: 13px 20px;
      font-size: 0.96rem;
      font-weight: 600;
      margin-top: 4px;
    }

    .admin-submit {
      background: #800020;
      border-color: #960026;
      &:hover:not(:disabled) {
        background: #960026;
      }
    }

    .admin-notice-box {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      background: rgba(128, 0, 32, 0.12);
      border: 1px solid rgba(128, 0, 32, 0.35);
      border-radius: var(--radius-sm);
      color: #e5a3b2;
      font-size: 0.78rem;
      line-height: 1.45;
    }

    .demo-creds-hint {
      padding: 10px 12px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      color: var(--text-secondary);
      display: flex;
      flex-direction: column;
      gap: 4px;

      code {
        font-family: monospace;
        color: #ffb3c1;
        font-size: 0.84rem;
      }
    }

    .login-footer-info {
      text-align: center;
      margin-top: 24px;
      font-size: 0.76rem;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }

    .btn-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    .btn-spinner-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .fade-in {
      animation: fadeIn 0.22s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  readonly mode = signal<LoginMode>('options');
  readonly phoneStep = signal<VerificationStep>('input');
  readonly emailStep = signal<VerificationStep>('input');

  phoneNumber = '';
  phoneOtp = '';
  emailAddress = '';
  emailOtp = '';

  adminEmail = 'admin@spotbukk.com';
  adminPassword = '';
  showPassword = false;

  staffEmail = 'staff@spotbukk.com';
  staffPassword = '';
  showStaffPassword = false;

  readonly isLoading = signal<boolean>(false);
  readonly isGoogleLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly phoneTimer = signal<number>(0);
  readonly emailTimer = signal<number>(0);
  private phoneTimerInterval: any = null;
  private emailTimerInterval: any = null;

  returnUrl = '';

  ngOnInit(): void {
    const qParams = this.route.snapshot.queryParams;
    this.returnUrl = qParams['returnUrl'] || '';

    // Check if mode was specified in query params
    if (qParams['mode'] === 'admin') {
      this.mode.set('admin');
    } else if (qParams['mode'] === 'staff') {
      this.mode.set('staff');
    }

    // If reason was unauthenticated
    if (qParams['reason'] === 'unauthenticated') {
      if (qParams['mode'] === 'staff') {
        this.errorMessage.set('Staff authentication required to access this portal.');
      } else {
        this.errorMessage.set('Administrator authentication required to access this portal.');
      }
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  switchToMode(targetMode: LoginMode): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.mode.set(targetMode);
  }

  /**
   * Option 1: Continue with Google
   */
  async handleGoogleLogin(): Promise<void> {
    this.errorMessage.set(null);
    this.isGoogleLoading.set(true);

    try {
      // Authenticate with Google
      const user = await this.authService.loginWithGoogle();
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Google sign-in was unsuccessful.');
    } finally {
      this.isGoogleLoading.set(false);
    }
  }

  /**
   * Option 2: Send Phone OTP
   */
  async handleSendPhoneOtp(): Promise<void> {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const clean = this.phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      this.errorMessage.set('Please enter a valid 10-digit phone number.');
      return;
    }

    this.isLoading.set(true);
    try {
      const res = await this.authService.sendPhoneOtp(this.phoneNumber);
      this.phoneStep.set('otp');
      this.phoneOtp = '';
      this.successMessage.set(res.message || 'Verification code dispatched via SMS.');
      this.startPhoneCooldown(res.cooldownSeconds || 30);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Unable to send SMS verification code.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Verify Phone OTP
   */
  async handleVerifyPhoneOtp(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.phoneOtp || this.phoneOtp.trim().length !== 6) {
      this.errorMessage.set('Please enter the full 6-digit verification code.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.verifyPhoneOtp(this.phoneNumber, this.phoneOtp.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Send Email OTP
   */
  async handleSendEmailOtp(): Promise<void> {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.emailAddress.trim() || !emailRegex.test(this.emailAddress.trim())) {
      this.errorMessage.set('Please enter a valid email address.');
      return;
    }

    this.isLoading.set(true);
    try {
      const res = await this.authService.sendEmailOtp(this.emailAddress.trim());
      this.emailStep.set('otp');
      this.emailOtp = '';
      this.successMessage.set(res.message || 'Verification code sent to your email.');
      this.startEmailCooldown(res.cooldownSeconds || 30);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Unable to send email verification code.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Verify Email OTP
   */
  async handleVerifyEmailOtp(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.emailOtp || this.emailOtp.trim().length !== 6) {
      this.errorMessage.set('Please enter the full 6-digit verification code.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.verifyEmailOtp(this.emailAddress.trim(), this.emailOtp.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 4: Admin Login
   */
  async handleAdminLogin(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.adminEmail.trim() || !this.adminPassword.trim()) {
      this.errorMessage.set('Administrator email and security password are required.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.loginAsAdmin(this.adminEmail.trim(), this.adminPassword.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid administrator credentials. Access restricted.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private handlePostLoginRedirect(role: string): void {
    if (role === 'ADMIN') {
      if (this.returnUrl && (this.returnUrl.startsWith('/admin') || this.returnUrl.startsWith('/check-in'))) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/admin']);
      }
    } else if (role === 'STAFF') {
      if (this.returnUrl && this.returnUrl.startsWith('/staff')) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/staff']);
      }
    } else {
      // END_USER: If they attempted to access /admin, redirect to /events instead of forbidden admin page
      if (this.returnUrl && !this.returnUrl.startsWith('/admin') && !this.returnUrl.startsWith('/staff') && !this.returnUrl.startsWith('/check-in') && this.returnUrl !== '/unauthorized') {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/events']);
      }
    }
  }

  /**
   * Option 5: Staff Login
   */
  async handleStaffLogin(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.staffEmail.trim() || !this.staffPassword.trim()) {
      this.errorMessage.set('Staff email and password are required.');
      return;
    }

    this.isLoading.set(true);
    try {
      const user = await this.authService.loginAsStaff(this.staffEmail.trim(), this.staffPassword.trim());
      this.handlePostLoginRedirect(user.role);
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid staff credentials. Access restricted.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private startPhoneCooldown(seconds: number): void {
    this.phoneTimer.set(seconds);
    if (this.phoneTimerInterval) clearInterval(this.phoneTimerInterval);
    this.phoneTimerInterval = setInterval(() => {
      const current = this.phoneTimer();
      if (current <= 1) {
        clearInterval(this.phoneTimerInterval);
        this.phoneTimer.set(0);
      } else {
        this.phoneTimer.set(current - 1);
      }
    }, 1000);
  }

  private startEmailCooldown(seconds: number): void {
    this.emailTimer.set(seconds);
    if (this.emailTimerInterval) clearInterval(this.emailTimerInterval);
    this.emailTimerInterval = setInterval(() => {
      const current = this.emailTimer();
      if (current <= 1) {
        clearInterval(this.emailTimerInterval);
        this.emailTimer.set(0);
      } else {
        this.emailTimer.set(current - 1);
      }
    }, 1000);
  }

  private clearTimers(): void {
    if (this.phoneTimerInterval) clearInterval(this.phoneTimerInterval);
    if (this.emailTimerInterval) clearInterval(this.emailTimerInterval);
  }
}
