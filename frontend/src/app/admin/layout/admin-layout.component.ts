import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-shell">
      <!-- Admin Sidebar -->
      <aside class="admin-sidebar" [class.mobile-open]="sidebarOpen">
        <div class="sidebar-top">
          <a routerLink="/" class="admin-brand" aria-label="SpotBukk Home">
            <img src="/logo.png" alt="SpotBukk" class="admin-brand-logo" />
          </a>
          <button class="close-sidebar-btn" (click)="sidebarOpen = false" aria-label="Close Sidebar">&times;</button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-title">Core Management</div>
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="9"/>
              <rect x="14" y="3" width="7" height="5"/>
              <rect x="14" y="12" width="7" height="9"/>
              <rect x="3" y="16" width="7" height="5"/>
            </svg>
            Dashboard
          </a>

          <a routerLink="/admin/events" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Events & Calendar
          </a>

          <a routerLink="/admin/events/create" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Create Event
          </a>

          <div class="nav-section-title">Guests & Revenue</div>
          <a routerLink="/admin/registrations" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Registrations
          </a>

          <a routerLink="/admin/payments" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Payments & Audits
          </a>

          <a routerLink="/admin/checkins" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Door Check-Ins
          </a>

          <!-- QR Scanner option (Visible ONLY to authenticated ADMIN) -->
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link qr-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <rect x="7" y="7" width="10" height="10" rx="1"/>
            </svg>
            Live QR Scanner
          </a>

          <a routerLink="/admin/analytics" routerLinkActive="active" (click)="sidebarOpen = false" class="side-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Analytics & Metrics
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/" class="public-switch-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Return to Public Website
          </a>
          <button type="button" class="sidebar-signout-btn" (click)="authService.logout()">
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Admin Main Area -->
      <div class="admin-main">
        <!-- Top Navbar -->
        <header class="admin-topbar glass-panel">
          <div class="topbar-left">
            <button class="mobile-sidebar-toggle" (click)="sidebarOpen = true" aria-label="Toggle Sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <a routerLink="/" class="admin-mobile-brand" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk" class="admin-mobile-logo" />
            </a>
            <span class="host-enclave-badge">Indiranagar Penthouse Collective</span>
          </div>

          <div class="topbar-right">
            <!-- Direct scanner button (Visible ONLY when user role is ADMIN) -->
            <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" class="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              </svg>
              QR Scanner
            </a>

            <!-- Role Badge -->
            <div class="auth-role-badge">
              <span class="role-pill" [class.admin]="authService.isAdmin()">
                {{ authService.currentUser()?.role || 'GUEST' }}
              </span>
            </div>

            <!-- Sign Out Button -->
            <button
              type="button"
              class="admin-signout-btn"
              (click)="authService.logout()"
              title="Sign Out"
            >
              Sign Out
            </button>

            <!-- Admin avatar -->
            <div class="admin-avatar" title="Curator Account">
              <span>NK</span>
            </div>
          </div>
        </header>

        <!-- Dynamic Admin Child Outlet -->
        <div class="admin-content-viewport">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: flex;
      min-height: 100vh;
      background: var(--bg-page);
    }

    /* Sidebar */
    .admin-sidebar {
      width: 260px;
      background: var(--bg-surface);
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 100;
      transition: transform var(--transition-normal);

      @media (max-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);

        &.mobile-open {
          transform: translateX(0);
          box-shadow: var(--shadow-drawer);
        }
      }
    }

    .sidebar-top {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
    }

    .admin-brand {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .admin-brand-logo {
      height: 44px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .admin-mobile-brand {
      display: none;
      align-items: center;
      text-decoration: none;

      @media (max-width: 900px) {
        display: inline-flex;
      }
    }

    .admin-mobile-logo {
      height: 32px;
      width: auto;
      max-width: 110px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .close-sidebar-btn {
      display: none;
      font-size: 1.6rem;
      color: var(--text-muted);

      @media (max-width: 900px) {
        display: block;
      }
    }

    .sidebar-nav {
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      overflow-y: auto;
    }

    .nav-section-title {
      font-family: var(--font-display);
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      padding: 16px 12px 6px;
    }

    .side-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all var(--transition-fast);

      svg {
        flex-shrink: 0;
      }

      &:hover {
        color: var(--text-primary);
        background: var(--bg-surface-subtle);
      }

      &.active {
        color: var(--accent);
        background: var(--accent-subtle);
        font-weight: 600;
      }
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid var(--border-subtle);
    }

    .public-switch-link {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;

      &:hover {
        color: var(--accent);
      }
    }

    /* Main Area */
    .admin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .admin-topbar {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 90;

      @media (max-width: 768px) {
        padding: 0 16px;
      }
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mobile-sidebar-toggle {
      display: none;
      color: var(--text-primary);

      @media (max-width: 900px) {
        display: block;
      }
    }

    .host-enclave-badge {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.04em;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .theme-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      color: var(--text-secondary);
      font-weight: 600;

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .theme-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .admin-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      color: var(--accent);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.78rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-signout-btn {
      background: none;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 5px 10px;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.4);
        background: rgba(128, 0, 32, 0.15);
      }
    }

    .sidebar-signout-btn {
      margin-top: 8px;
      width: 100%;
      background: none;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.8rem;
      padding: 8px 12px;
      cursor: pointer;
      text-align: center;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.3);
        background: rgba(128, 0, 32, 0.12);
      }
    }

    .admin-content-viewport {
      padding: 32px;
      flex: 1;

      @media (max-width: 768px) {
        padding: 20px 16px;
      }
    }

    .auth-role-badge {
      display: flex;
      align-items: center;
    }

    .role-pill {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 3px 8px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);

      &.admin {
        background: rgba(128, 0, 32, 0.18);
        border-color: rgba(128, 0, 32, 0.4);
        color: #ff5277;
      }
    }

    .qr-nav-link {
      background: rgba(128, 0, 32, 0.08);
      border: 1px solid rgba(128, 0, 32, 0.25);
      color: #ff5277 !important;

      &:hover {
        background: rgba(128, 0, 32, 0.16);
      }
    }
  `]
})
export class AdminLayoutComponent {
  readonly authService = inject(AuthService);
  sidebarOpen = false;
}
