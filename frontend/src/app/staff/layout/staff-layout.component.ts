import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="staff-shell">
      <!-- Staff Top Navigation Bar -->
      <header class="staff-header glass-panel">
        <div class="container header-content">
          <!-- Left: Brand + Portal Badge -->
          <div class="brand-group">
            <a routerLink="/staff" class="staff-brand" aria-label="SpotBukk Staff Portal">
              <img src="/logo.png" alt="SpotBukk" class="staff-logo-img" />
            </a>
            <div class="portal-badge">
              <span class="portal-dot"></span>
              <span class="portal-label">STAFF PORTAL</span>
            </div>
          </div>

          <!-- Center: Primary Operational Navigation (Desktop) -->
          <nav class="staff-nav desktop-nav">
            <a
              routerLink="/staff"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              class="nav-tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="9"/>
                <rect x="14" y="3" width="7" height="5"/>
                <rect x="14" y="12" width="7" height="9"/>
                <rect x="3" y="16" width="7" height="5"/>
              </svg>
              Dashboard
            </a>
            <a
              routerLink="/staff/check-in"
              routerLinkActive="active"
              class="nav-tab check-in-tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10" rx="1"/>
              </svg>
              Check-In Scanner
            </a>
            <a
              routerLink="/staff/events"
              routerLinkActive="active"
              class="nav-tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Assigned Events
            </a>
            <a
              routerLink="/staff/media"
              routerLinkActive="active"
              class="nav-tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Photos & Videos
            </a>
            <a
              routerLink="/staff/activity"
              routerLinkActive="active"
              class="nav-tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20v-6M6 20V10M18 20V4"/>
              </svg>
              Live Activity
            </a>
          </nav>

          <!-- Right: Authenticated User Pill & Sign Out -->
          <div class="user-actions">
            <div class="staff-profile-pill">
              <span class="user-greeting">
                Welcome back, <strong class="staff-user-name">{{ staffDisplayName }}</strong>
              </span>
              <span class="role-badge">STAFF</span>
            </div>

            <button
              type="button"
              class="btn btn-subtle btn-sm logout-btn"
              (click)="handleSignOut()"
              title="Sign Out of Staff Portal"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span class="sign-out-text">Sign Out</span>
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button
              class="mobile-toggle-btn"
              (click)="mobileMenuOpen = !mobileMenuOpen"
              [attr.aria-expanded]="mobileMenuOpen"
              aria-label="Toggle Navigation"
            >
              <span class="bar" [class.open]="mobileMenuOpen"></span>
              <span class="bar" [class.open]="mobileMenuOpen"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer -->
        <div class="staff-mobile-drawer" [class.open]="mobileMenuOpen">
          <div class="mobile-user-banner">
            <div class="mobile-user-info">
              <span class="m-user-name">{{ staffDisplayName }}</span>
              <span class="role-badge">STAFF ACCOUNT</span>
            </div>
          </div>
          <div class="mobile-nav-links">
            <a
              routerLink="/staff"
              (click)="mobileMenuOpen = false"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              class="m-link"
            >
              Dashboard
            </a>
            <a
              routerLink="/staff/check-in"
              (click)="mobileMenuOpen = false"
              routerLinkActive="active"
              class="m-link highlight"
            >
              Check-In Scanner
            </a>
            <a
              routerLink="/staff/events"
              (click)="mobileMenuOpen = false"
              routerLinkActive="active"
              class="m-link"
            >
              Assigned Events
            </a>
            <a
              routerLink="/staff/media"
              (click)="mobileMenuOpen = false"
              routerLinkActive="active"
              class="m-link"
            >
              Photos & Videos
            </a>
            <a
              routerLink="/staff/activity"
              (click)="mobileMenuOpen = false"
              routerLinkActive="active"
              class="m-link"
            >
              Live Activity
            </a>
          </div>
          <div class="mobile-footer-action">
            <button class="btn btn-subtle w-full" (click)="handleSignOut(); mobileMenuOpen = false">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <!-- Main Portal Viewport -->
      <main class="staff-main-viewport">
        <router-outlet></router-outlet>
      </main>

      <!-- Minimal Operational Footer -->
      <footer class="staff-footer">
        <div class="container footer-content">
          <span class="footer-note">SpotBukk Venue Operations Portal &bull; Encrypted Door Clearance</span>
          <span class="footer-status">
            <span class="status-live-dot"></span>
            Door Clearance Protocol Active
          </span>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .staff-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--bg-page);
      color: var(--text-primary);
    }

    .staff-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--glass-bg);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
      gap: 16px;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .staff-brand {
      display: flex;
      align-items: center;
    }

    .staff-logo-img {
      height: 38px;
      width: auto;
      object-fit: contain;
    }

    .portal-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      background: rgba(128, 0, 32, 0.18);
      border: 1px solid rgba(128, 0, 32, 0.38);
    }

    .portal-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff4d6d;
      box-shadow: 0 0 6px #ff4d6d;
    }

    .portal-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #ff99aa;
      text-transform: uppercase;
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 6px;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .nav-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      font-size: 0.86rem;
      font-weight: 500;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);

      &:hover {
        color: var(--text-primary);
        background: var(--bg-surface-subtle);
      }

      &.active {
        color: var(--text-primary);
        background: var(--bg-surface-elevated);
        border: 1px solid var(--border-medium);
        font-weight: 600;
      }

      &.check-in-tab.active {
        border-color: rgba(128, 0, 32, 0.5);
        color: #ffb3c1;
      }
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .staff-profile-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      font-size: 0.82rem;

      @media (max-width: 680px) {
        display: none;
      }
    }

    .user-greeting {
      color: var(--text-secondary);
    }

    .staff-user-name {
      color: var(--text-primary);
      font-weight: 600;
    }

    .role-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: var(--radius-full);
      background: rgba(128, 0, 32, 0.28);
      border: 1px solid rgba(128, 0, 32, 0.5);
      color: #ffb3c1;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    .logout-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      @media (max-width: 480px) {
        .sign-out-text {
          display: none;
        }
      }
    }

    .mobile-toggle-btn {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      padding: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      cursor: pointer;

      @media (max-width: 900px) {
        display: flex;
      }

      .bar {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        transition: transform var(--transition-fast), opacity var(--transition-fast);

        &.open:nth-child(1) {
          transform: translateY(3.5px) rotate(45deg);
        }

        &.open:nth-child(2) {
          transform: translateY(-3.5px) rotate(-45deg);
        }
      }
    }

    .staff-mobile-drawer {
      display: none;
      flex-direction: column;
      padding: 16px;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-medium);

      &.open {
        display: flex;
      }

      @media (min-width: 901px) {
        display: none !important;
      }
    }

    .mobile-user-banner {
      padding: 12px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      margin-bottom: 12px;
    }

    .mobile-user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .m-user-name {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }

    .m-link {
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.92rem;
      transition: all var(--transition-fast);

      &:hover,
      &.active {
        color: var(--text-primary);
        background: var(--bg-surface-elevated);
      }

      &.highlight {
        color: #ffb3c1;
        font-weight: 600;
      }
    }

    .staff-main-viewport {
      flex: 1;
      padding: 32px 0 64px;
    }

    .staff-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 18px 0;
      background: var(--bg-surface);
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .footer-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-secondary);
    }

    .status-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class StaffLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  mobileMenuOpen = false;

  get staffDisplayName(): string {
    const user = this.authService.currentUser();
    return user?.name || user?.fullName || 'Arjun Menon';
  }

  handleSignOut(): void {
    this.authService.logout(true);
  }
}
