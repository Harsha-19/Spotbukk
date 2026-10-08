import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauth-page container container-narrow">
      <div class="unauth-card card-base">
        <!-- Brand Logo -->
        <div class="auth-brand">
          <a routerLink="/" aria-label="SpotBukk Home">
            <img src="/logo.png" alt="SpotBukk" class="auth-logo-img" />
          </a>
        </div>

        <!-- Shield Icon with Burgundy Warning Glow -->
        <div class="icon-wrap">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <span class="editorial-kicker">Security Clearance Protocol</span>
        <h1 class="unauth-title">403 FORBIDDEN</h1>
        <p class="unauth-subtitle">
          The QR Scanner and Door Clearance Engine are strictly restricted to authenticated <strong>ADMINISTRATOR</strong> accounts.
        </p>

        <!-- Current Session Diagnosis -->
        <div class="session-diagnosis">
          <div class="diag-row">
            <span class="diag-label">Authentication Status:</span>
            <span class="diag-val" [class.text-danger]="!authService.isAuthenticated()">
              {{ authService.isAuthenticated() ? 'Authenticated' : 'Unauthenticated / Guest' }}
            </span>
          </div>
          <div class="diag-row">
            <span class="diag-label">Current Active Role:</span>
            <span class="diag-val badge-role" [class.admin]="authService.isAdmin()" [class.user]="authService.isUser()">
              {{ authService.currentUser()?.role || 'NONE' }}
            </span>
          </div>
          <div class="diag-row">
            <span class="diag-label">Requested Protected Route:</span>
            <span class="diag-val font-mono">{{ returnUrl || '/check-in' }}</span>
          </div>
        </div>

        <div class="unauth-reasons">
          <p>
            Normal attendees, guests, and general customer accounts cannot operate the camera hardware or verify attendee admission barcodes.
          </p>
        </div>

        <!-- Action CTAs -->
        <div class="actions-stack">
          <button class="btn btn-primary btn-block" (click)="signInAsAdmin()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Authenticate as Administrator (Curator Account)
          </button>

          <a routerLink="/events" class="btn btn-subtle btn-block">
            &larr; Return to Curated Events
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauth-page {
      padding: 60px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 160px);
    }

    .unauth-card {
      width: 100%;
      max-width: 540px;
      padding: 40px;
      text-align: center;
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-elevated);
      border-radius: var(--radius-lg);
      background: var(--bg-surface);
    }

    .auth-brand {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;

      a {
        display: inline-block;
        transition: opacity var(--transition-fast);
        &:hover { opacity: 0.92; }
      }
    }

    .auth-logo-img {
      height: 52px;
      width: auto;
      max-width: 160px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .icon-wrap {
      width: 72px;
      height: 72px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: rgba(128, 0, 32, 0.12);
      border: 1px solid rgba(128, 0, 32, 0.35);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .unauth-title {
      font-size: 2rem;
      letter-spacing: -0.02em;
      margin: 6px 0 12px;
    }

    .unauth-subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 24px;

      strong {
        color: var(--accent);
        font-weight: 700;
      }
    }

    .session-diagnosis {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 24px;
      text-align: left;
      font-size: 0.85rem;
    }

    .diag-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }
    }

    .diag-label {
      color: var(--text-muted);
    }

    .diag-val {
      color: var(--text-primary);
      font-weight: 600;
    }

    .badge-role {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &.admin {
        background: rgba(128, 0, 32, 0.2);
        color: #ff4d6d;
        border: 1px solid rgba(128, 0, 32, 0.4);
      }

      &.user {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-secondary);
      }
    }

    .unauth-reasons {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 28px;
    }

    .actions-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .btn-block {
      width: 100%;
      justify-content: center;
    }

    .text-danger {
      color: #e87b7b;
    }
  `]
})
export class UnauthorizedComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  returnUrl = '';

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  signInAsAdmin(): void {
    this.router.navigate(['/login'], {
      queryParams: { mode: 'admin', returnUrl: this.returnUrl || '/admin' }
    });
  }
}
