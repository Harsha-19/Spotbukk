import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header glass-panel">
      <div class="container header-inner">
        <!-- Logo -->
        <a routerLink="/" class="brand-link" (click)="closeMobileMenu()" aria-label="SpotBukk Home">
          <img src="/logo.png" alt="SpotBukk" class="brand-logo-img" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a routerLink="/events" routerLinkActive="active" class="nav-link">Events</a>
          <a routerLink="/" fragment="experience" class="nav-link">Experience</a>
          <a routerLink="/" fragment="faq" class="nav-link">FAQ</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" routerLinkActive="active" class="nav-link">
            <span class="pulse-dot"></span>
            Door Scanner
          </a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin" routerLinkActive="active" class="nav-link admin-pill">
            Admin Portal
          </a>
          <a *ngIf="authService.isStaff()" routerLink="/staff" routerLinkActive="active" class="nav-link admin-pill">
            Staff Portal
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="header-actions">
          <!-- Unauthenticated: Sign In button -->
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" class="nav-link signin-btn">
            Sign In
          </a>

          <!-- Authenticated User Profile Pill & Sign Out -->
          <div *ngIf="authService.isAuthenticated()" class="user-profile-menu">
            <span class="user-tag" [class.admin]="authService.isAdmin()">
              <span class="role-icon">{{ authService.isAdmin() ? '🛡️' : '👤' }}</span>
              <span class="user-name">{{ authService.currentUser()?.name || authService.currentUser()?.fullName }}</span>
              <span class="user-role-badge">{{ authService.currentUser()?.role }}</span>
            </span>
            <button
              type="button"
              class="sign-out-btn"
              (click)="authService.logout()"
              title="Sign Out"
              aria-label="Sign Out"
            >
              Sign Out
            </button>
          </div>

          <!-- Primary CTA -->
          <a routerLink="/events" class="btn btn-primary btn-sm cta-desktop">
            Explore Events
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="mobile-toggle"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen"
            aria-label="Toggle Navigation"
          >
            <span class="bar" [class.open]="mobileMenuOpen"></span>
            <span class="bar" [class.open]="mobileMenuOpen"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen">
        <div class="mobile-drawer-brand">
          <img src="/logo.png" alt="SpotBukk" class="drawer-logo-img" />
        </div>
        <div class="mobile-nav-links">
          <a routerLink="/" (click)="closeMobileMenu()" class="mobile-link">Home</a>
          <a routerLink="/events" (click)="closeMobileMenu()" class="mobile-link">Discover Events</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" (click)="closeMobileMenu()" class="mobile-link">Door Scanner</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin" (click)="closeMobileMenu()" class="mobile-link admin-highlight">Admin Dashboard</a>
          <a *ngIf="authService.isStaff()" routerLink="/staff" (click)="closeMobileMenu()" class="mobile-link admin-highlight">Staff Portal</a>
          
          <a *ngIf="!authService.isAuthenticated()" routerLink="/login" (click)="closeMobileMenu()" class="mobile-link signin-highlight">
            Sign In
          </a>
        </div>

        <div class="mobile-drawer-bottom">
          <div *ngIf="authService.isAuthenticated()" class="mobile-user-card">
            <div class="user-meta">
              <span class="user-title">{{ authService.currentUser()?.name || authService.currentUser()?.fullName }}</span>
              <span class="user-sub">{{ authService.currentUser()?.email || authService.currentUser()?.phone }}</span>
              <span class="user-role-badge" [class.admin]="authService.isAdmin()">{{ authService.currentUser()?.role }}</span>
            </div>
            <button class="btn btn-subtle w-full" (click)="authService.logout(); closeMobileMenu()">
              Sign Out
            </button>
          </div>

          <a routerLink="/events" (click)="closeMobileMenu()" class="btn btn-primary w-full">
            Explore Events
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-top: none;
      border-left: none;
      border-right: none;
      transition: background-color var(--transition-fast);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .brand-logo-img {
      height: 48px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);

      @media (max-width: 600px) {
        height: 40px;
      }
    }

    .mobile-drawer-brand {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
    }

    .drawer-logo-img {
      height: 46px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 28px;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .nav-link {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: color var(--transition-fast);
      display: inline-flex;
      align-items: center;
      gap: 8px;

      &:hover,
      &.active {
        color: var(--text-primary);
      }
    }

    .admin-pill {
      padding: 4px 12px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      background: var(--bg-surface-subtle);
      font-size: 0.8rem;
      color: var(--text-secondary);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 6px var(--accent);
      animation: pulseDot 2s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .signin-btn {
      padding: 6px 14px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--text-primary);
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent);
        background: var(--accent-subtle);
        color: #ffffff;
      }
    }

    .user-profile-menu {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      color: var(--text-secondary);

      &.admin {
        border-color: rgba(128, 0, 32, 0.4);
        background: rgba(128, 0, 32, 0.15);
        color: #ffb3c1;
      }

      .role-icon {
        font-size: 0.85rem;
      }

      .user-name {
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
      }

      .user-role-badge {
        font-size: 0.68rem;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: var(--radius-xs);
        background: rgba(255, 255, 255, 0.08);
      }
    }

    .sign-out-btn {
      background: none;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 0.76rem;
      padding: 4px 8px;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        color: #ff9999;
        border-color: rgba(255, 100, 100, 0.3);
      }
    }

    .mobile-user-card {
      padding: 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 10px;

      .user-meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .user-title {
        font-size: 0.94rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .user-sub {
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      .user-role-badge {
        align-self: flex-start;
        margin-top: 4px;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);

        &.admin {
          background: rgba(128, 0, 32, 0.3);
          color: #ffb3c1;
          border: 1px solid rgba(128, 0, 32, 0.45);
        }
      }
    }

    .signin-highlight {
      color: #ff9999 !important;
    }

    .theme-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    .theme-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .cta-desktop {
      @media (max-width: 600px) {
        display: none;
      }
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      width: 36px;
      height: 36px;
      padding: 6px;

      @media (max-width: 900px) {
        display: flex;
      }

      .bar {
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        transition: transform var(--transition-fast);

        &.open:nth-child(1) {
          transform: translateY(4px) rotate(45deg);
        }
        &.open:nth-child(2) {
          transform: translateY(-4px) rotate(-45deg);
        }
      }
    }

    .mobile-drawer {
      display: none;

      @media (max-width: 900px) {
        display: block;
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: var(--bg-surface-elevated);
        border-bottom: 1px solid var(--border-medium);
        padding: 24px;
        box-shadow: var(--shadow-drawer);
        transform: translateY(-120%);
        transition: transform var(--transition-normal);
        z-index: 999;

        &.open {
          transform: translateY(0);
        }
      }
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .mobile-link {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      padding: 8px 0;
      border-bottom: 1px solid var(--border-subtle);

      &.admin-highlight {
        color: var(--accent);
      }
    }

    .mobile-drawer-bottom {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
