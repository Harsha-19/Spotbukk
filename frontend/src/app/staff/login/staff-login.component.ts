import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="staff-login-page">
      <div class="login-backdrop-glow"></div>

      <div class="login-container">
        <div class="login-card glass-panel">
          <!-- Logo & Header -->
          <div class="card-header">
            <a routerLink="/" class="brand-logo-link" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk Logo" class="login-logo-img" />
            </a>

            <div class="header-titles">
              <div class="staff-badge">
                <span class="security-dot"></span>
                Operational Door Clearance
              </div>
              <h1 class="welcome-title">Staff Sign In</h1>
              <p class="welcome-subtitle">Venue & door operations personnel only</p>
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

          <!-- Staff Login Form -->
          <form (ngSubmit)="handleStaffLogin()" class="auth-form">
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
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="staffPassword"
                  name="staffPassword"
                  placeholder="Enter staff security key"
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

            <div class="staff-notice-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Staff credentials grant door check-in & event operation clearance only. Administrative controls are restricted.</span>
            </div>

            <button
              type="submit"
              id="btn-staff-submit"
              class="btn btn-primary btn-block submit-btn staff-submit"
              [disabled]="isLoading() || !staffEmail.trim() || !staffPassword.trim()"
            >
              <span *ngIf="!isLoading()">Authenticate as Staff</span>
              <span *ngIf="isLoading()" class="btn-spinner-text">
                <span class="btn-spinner"></span> Verifying Staff Credentials...
              </span>
            </button>

          </form>

          <!-- Alternative Links -->
          <div class="card-footer-switch">
            <a routerLink="/login" class="subtle-link">
              &larr; Return to Customer Sign In
            </a>
            <a routerLink="/login" [queryParams]="{ mode: 'admin' }" class="admin-link">
              Administrator Portal &rarr;
            </a>
          </div>
        </div>

        <div class="login-footer-info">
          <span>Protected by SpotBukk Venue Operations Protocol</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .staff-login-page {
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
      height: 52px;
      width: auto;
      display: block;
      margin: 0 auto;
    }

    .staff-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(128, 0, 32, 0.25);
      border: 1px solid rgba(128, 0, 32, 0.45);
      color: #ff99aa;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    .security-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff4d6d;
      box-shadow: 0 0 6px #ff4d6d;
    }

    .welcome-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 6px;
      letter-spacing: -0.02em;
    }

    .welcome-subtitle {
      font-size: 0.92rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .alert-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      margin-bottom: 20px;
      font-size: 0.88rem;
    }

    .alert-error {
      background: rgba(163, 44, 44, 0.18);
      border: 1px solid rgba(163, 44, 44, 0.45);
      color: #fca5a5;
    }

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
      font-size: 0.82rem;
      font-weight: 700;
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

    .staff-notice-box {
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

    .submit-btn {
      padding: 14px 20px;
      font-size: 0.96rem;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .staff-submit {
      background: var(--accent);
      border-color: var(--accent-hover);
      &:hover:not(:disabled) {
        background: var(--accent-hover);
      }
    }

    .demo-creds-hint {
      padding: 12px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      border: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      gap: 4px;

      .hint-label {
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      code {
        font-family: monospace;
        color: #ffb3c1;
        font-size: 0.86rem;
      }

      .hint-user-role {
        font-size: 0.74rem;
        color: var(--text-secondary);
      }
    }

    .card-footer-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      margin-top: 6px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.84rem;
    }

    .subtle-link {
      color: var(--text-muted);
      transition: color var(--transition-fast);
      &:hover { color: var(--text-primary); }
    }

    .admin-link {
      color: #d16b80;
      font-weight: 600;
      transition: color var(--transition-fast);
      &:hover { color: #ff99aa; }
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

    .btn-block {
      width: 100%;
    }
  `]
})
export class StaffLoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  staffEmail = 'staff@spotbukk.com';
  staffPassword = '';
  showPassword = false;

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  private returnUrl = '';

  ngOnInit(): void {
    const qParams = this.route.snapshot.queryParams;
    this.returnUrl = qParams['returnUrl'] || '/staff';

    // If already authenticated as staff, redirect directly to /staff
    if (this.authService.isStaff() || this.authService.isAdmin()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  async handleStaffLogin(): Promise<void> {
    this.errorMessage.set(null);

    if (!this.staffEmail.trim() || !this.staffPassword.trim()) {
      this.errorMessage.set('Staff email and password are required.');
      return;
    }

    this.isLoading.set(true);
    try {
      await this.authService.loginAsStaff(this.staffEmail.trim(), this.staffPassword.trim());
      this.router.navigateByUrl(this.returnUrl && this.returnUrl.startsWith('/staff') ? this.returnUrl : '/staff');
    } catch (err: any) {
      this.errorMessage.set(err.message || 'Invalid staff credentials. Access restricted.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
