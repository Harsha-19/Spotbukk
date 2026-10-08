import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container footer-content">
        <!-- Top row: Brand & Guestlist -->
        <div class="footer-top">
          <div class="footer-brand-col">
            <a routerLink="/" class="footer-brand" aria-label="SpotBukk Home">
              <img src="/logo.png" alt="SpotBukk" class="footer-logo-img" />
            </a>
            <p class="brand-desc">
              A private platform for curated house parties, boutique music nights, and high-hospitality social gatherings.
            </p>
            <div class="curated-cities">
              <span class="city-label">Active Enclaves:</span>
              <span class="city-tag">Bengaluru</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Mumbai</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Goa</span>
              <span class="city-separator">·</span>
              <span class="city-tag">Delhi</span>
            </div>
          </div>

          <!-- Private Guestlist Form -->
          <div class="guestlist-col">
            <span class="editorial-kicker">Private Access</span>
            <h4 class="guestlist-title">Join The SpotBukk Circle</h4>
            <p class="guestlist-desc">
              Receive unlisted gathering locations and secret drop invitations directly to your phone.
            </p>
            <form class="guestlist-form" (submit)="joinCircle($event)">
              <input
                type="email"
                placeholder="Enter your private email..."
                required
                class="form-control guestlist-input"
                #emailInput
              />
              <button type="submit" class="btn btn-primary btn-sm">Request Access</button>
            </form>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="footer-links-grid">
          <div class="link-column">
            <h5 class="column-title">Gatherings</h5>
            <a routerLink="/events" class="f-link">Discover Events</a>
            <a routerLink="/events" [queryParams]="{category: 'House Party'}" class="f-link">House Parties</a>
            <a routerLink="/events" [queryParams]="{category: 'Rooftop Sessions'}" class="f-link">Rooftop Sessions</a>
            <a routerLink="/events" [queryParams]="{category: 'Intimate DJ'}" class="f-link">Listening Rooms</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Hosts & Curators</h5>
            <a routerLink="/admin" class="f-link">Organizer Dashboard</a>
            <a routerLink="/admin/events/create" class="f-link">Host a Gathering</a>
            <a *ngIf="authService.isAdmin()" routerLink="/admin/scanner" class="f-link">Door Scanner Utility</a>
            <a routerLink="/admin/analytics" class="f-link">Audience Analytics</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Platform</h5>
            <a routerLink="/" fragment="experience" class="f-link">The Experience</a>
            <a routerLink="/" fragment="faq" class="f-link">Rules & Etiquette</a>
            <a routerLink="/" class="f-link">Sound & Acoustics</a>
            <a routerLink="/login" class="f-link">Sign In / Account</a>
          </div>

          <div class="link-column">
            <h5 class="column-title">Safety & Ethos</h5>
            <span class="f-text">21+ Curated Attendance</span>
            <span class="f-text">No Non-Consensual Recording</span>
            <span class="f-text">Zero Tolerance Harassment</span>
            <span class="f-text">Vetted Entry Protocol</span>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="footer-bottom">
          <div class="copyright">
            © 2026 SpotBukk INC. ALL RIGHTS RESERVED · NIGHTS WORTH REMEMBERING.
          </div>
          <div class="client-demo-tag">
            <span>CLIENT DEMO PLATFORM · PREMIUM HOUSE PARTY ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: var(--bg-surface);
      border-top: 1px solid var(--border-subtle);
      padding: 72px 0 32px;
      margin-top: 96px;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 48px;
      padding-bottom: 56px;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
        gap: 36px;
      }
    }

    .footer-brand {
      display: inline-block;
      margin-bottom: 20px;
      text-decoration: none;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.92;
      }
    }

    .footer-logo-img {
      height: 52px;
      width: auto;
      max-width: 160px;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-xs);

      @media (max-width: 600px) {
        height: 44px;
      }
    }

    .brand-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      max-width: 440px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .curated-cities {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.8rem;
    }

    .city-label {
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    .city-tag {
      color: var(--text-primary);
      font-weight: 600;
    }

    .city-separator {
      color: var(--text-muted);
    }

    .guestlist-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    .guestlist-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .guestlist-form {
      display: flex;
      gap: 8px;

      @media (max-width: 500px) {
        flex-direction: column;
      }
    }

    .guestlist-input {
      flex: 1;
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      padding: 56px 0;
      border-bottom: 1px solid var(--border-subtle);

      @media (max-width: 860px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .column-title {
      font-family: var(--font-display);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      margin-bottom: 18px;
    }

    .link-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .f-link {
      font-size: 0.85rem;
      color: var(--text-secondary);

      &:hover {
        color: var(--text-primary);
        transform: translateX(2px);
      }
    }

    .f-text {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 28px;
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }

    .client-demo-tag {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: 0.08em;
    }
  `]
})
export class FooterComponent {
  private readonly toast = inject(ToastService);
  readonly authService = inject(AuthService);

  joinCircle(event: Event): void {
    event.preventDefault();
    this.toast.success(
      'Guestlist Request Received',
      'You are on the priority waitlist for unlisted secret gatherings.'
    );
  }
}
