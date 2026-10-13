import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StaffDataService } from '../services/staff-data.service';
import { StaffEvent } from '../../core/data/staff-seed.data';
import { MediaUploadModalComponent } from '../../shared/components/media-upload-modal/media-upload-modal.component';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaUploadModalComponent],
  template: `
    <div class="staff-dashboard container">
      <!-- Portal Header Section -->
      <header class="dashboard-hero">
        <div class="hero-left">
          <span class="editorial-kicker">SPOTBUKK &bull; VENUE OPERATIONS</span>
          <h1 class="portal-main-title">Staff Portal</h1>
          <div class="user-greeting-row">
            <span class="greeting-text">Welcome back, <strong>{{ staffFirstName }}</strong></span>
            <span class="staff-role-pill">STAFF</span>
          </div>
        </div>

        <div class="hero-actions">
          <!-- Prominent "Upload Photos & Videos" Button -->
          <button
            type="button"
            id="btn-host-upload-photos-videos"
            class="btn btn-primary btn-lg upload-media-btn"
            (click)="isUploadModalOpen.set(true)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Photos & Videos
          </button>

          <a routerLink="/staff/media" class="btn btn-subtle btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Media Gallery
          </a>

          <a routerLink="/staff/check-in" class="btn btn-subtle btn-lg check-in-cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <rect x="7" y="7" width="10" height="10" rx="1"/>
            </svg>
            Door Clearance
          </a>
        </div>
      </header>

      <!-- Dashboard Statistics (Compact Cards) -->
      <section class="stats-grid" aria-label="Operational Metrics">
        <div class="stat-card card-base">
          <span class="stat-label">TODAY'S EVENTS</span>
          <div class="stat-value-row">
            <span class="stat-number">{{ staffData.totalEvents() }}</span>
            <span class="stat-sub">Active Today</span>
          </div>
        </div>

        <div class="stat-card card-base">
          <span class="stat-label">EXPECTED GUESTS</span>
          <div class="stat-value-row">
            <span class="stat-number">{{ staffData.expectedGuests() }}</span>
            <span class="stat-sub">Registered</span>
          </div>
        </div>

        <div class="stat-card card-base stat-highlight">
          <span class="stat-label">CHECKED IN</span>
          <div class="stat-value-row">
            <span class="stat-number highlight-num">{{ staffData.checkedInGuests() }}</span>
            <span class="stat-sub text-success">Admitted</span>
          </div>
        </div>

        <div class="stat-card card-base">
          <span class="stat-label">REMAINING</span>
          <div class="stat-value-row">
            <span class="stat-number">{{ staffData.remainingGuests() }}</span>
            <span class="stat-sub">Awaiting Entry</span>
          </div>
        </div>
      </section>

      <!-- Assigned Events Section -->
      <section class="assigned-events-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Assigned Events</h2>
            <p class="section-subtitle">Venue operations and door clearance for your active assignments</p>
          </div>
          <a routerLink="/staff/events" class="link-action">
            View All Events &rarr;
          </a>
        </div>

        <div class="events-grid">
          <article *ngFor="let event of staffData.events()" class="event-card card-base">
            <div class="event-card-header">
              <div class="city-badge">{{ event.city }}</div>
              <span class="edition-badge" *ngIf="event.edition">{{ event.edition }}</span>
            </div>

            <h3 class="event-title">{{ event.title }}</h3>

            <div class="event-meta-list">
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{{ event.date }}</span>
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{{ event.time }}</span>
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ event.venue }}</span>
              </div>
            </div>

            <!-- Attendance Progress -->
            <div class="attendance-block">
              <div class="attendance-labels">
                <span class="att-label">Expected: <strong>{{ event.expectedGuests }}</strong></span>
                <span class="att-label">Checked In: <strong>{{ event.checkedIn }}</strong></span>
              </div>
              <div class="progress-bar-wrap">
                <div
                  class="progress-bar-fill"
                  [style.width.%]="getProgressPercent(event)"
                ></div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="event-card-actions">
              <button
                type="button"
                class="btn btn-primary w-full open-checkin-btn"
                (click)="openCheckIn(event.id)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                OPEN CHECK-IN
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Today's Recent Check-In Activity Snapshot -->
      <section class="recent-activity-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Today's Check-In Activity</h2>
            <p class="section-subtitle">Real-time door clearance log</p>
          </div>
          <a routerLink="/staff/activity" class="link-action">
            Full Audit Log &rarr;
          </a>
        </div>

        <div class="activity-table-wrapper card-base">
          <div *ngIf="staffData.activities().length === 0" class="empty-state">
            No check-ins recorded yet today.
          </div>

          <div *ngFor="let item of recentActivities" class="activity-row">
            <div class="act-time-col">
              <span class="act-time">{{ item.time }}</span>
            </div>
            <div class="act-guest-col">
              <span class="act-guest-name">{{ item.guestName }}</span>
              <span class="act-pass-type">{{ item.passType }}</span>
            </div>
            <div class="act-event-col">
              <span class="act-event-name">{{ item.eventTitle }}</span>
            </div>
            <div class="act-status-col">
              <span
                class="status-pill"
                [class.status-success]="item.status === 'SUCCESS'"
                [class.status-warning]="item.status === 'ALREADY USED'"
                [class.status-error]="item.status === 'CANCELLED' || item.status === 'INVALID' || item.status === 'WRONG EVENT'"
              >
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Media Upload Modal -->
      <app-media-upload-modal
        [isOpen]="isUploadModalOpen()"
        (close)="isUploadModalOpen.set(false)"
      ></app-media-upload-modal>
    </div>
  `,
  styles: [`
    .staff-dashboard {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .dashboard-hero {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 20px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .editorial-kicker {
      font-size: 0.72rem;
      font-weight: 700;
      color: #ff99aa;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: block;
    }

    .portal-main-title {
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0 0 6px;
      letter-spacing: -0.03em;
    }

    .user-greeting-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .greeting-text {
      color: var(--text-secondary);
      font-size: 1.02rem;
    }

    .staff-role-pill {
      padding: 3px 10px;
      background: rgba(128, 0, 32, 0.28);
      border: 1px solid rgba(128, 0, 32, 0.45);
      color: #ff99aa;
      border-radius: var(--radius-full);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
    }

    .check-in-cta {
      gap: 10px;
      font-weight: 700;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);

      &.stat-highlight {
        border-color: rgba(128, 0, 32, 0.4);
        background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(128, 0, 32, 0.08) 100%);
      }
    }

    .stat-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .stat-value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .stat-number {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;

      &.highlight-num {
        color: #ffb3c1;
      }
    }

    .stat-sub {
      font-size: 0.78rem;
      color: var(--text-muted);

      &.text-success {
        color: #6ee7b7;
      }
    }

    /* Section Styles */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .section-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin: 0 0 4px;
    }

    .section-subtitle {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .link-action {
      font-size: 0.86rem;
      font-weight: 600;
      color: #ff99aa;
      transition: color var(--transition-fast);

      &:hover {
        color: #ffffff;
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .event-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      transition: border-color var(--transition-fast), transform var(--transition-fast);

      &:hover {
        border-color: rgba(128, 0, 32, 0.45);
        transform: translateY(-2px);
      }
    }

    .event-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .city-badge {
      display: inline-block;
      padding: 3px 9px;
      border-radius: var(--radius-sm);
      background: var(--bg-surface-elevated);
      color: var(--text-secondary);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid var(--border-subtle);
    }

    .edition-badge {
      font-size: 0.74rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .event-title {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      margin: 0;
      color: var(--text-primary);
    }

    .event-meta-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: var(--text-secondary);

      svg {
        color: var(--text-muted);
        flex-shrink: 0;
      }
    }

    .attendance-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 14px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }

    .attendance-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
      }
    }

    .progress-bar-wrap {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #800020, #e11d48);
      border-radius: var(--radius-full);
      transition: width 0.4s ease;
    }

    .open-checkin-btn {
      letter-spacing: 0.05em;
      font-weight: 700;
    }

    /* Activity Rows */
    .activity-table-wrapper {
      padding: 8px 16px;
      background: var(--bg-surface);
      overflow-x: auto;
    }

    .activity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 8px;
      border-bottom: 1px solid var(--border-subtle);
      gap: 12px;

      &:last-child {
        border-bottom: none;
      }

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
    }

    .act-time-col {
      min-width: 80px;
    }

    .act-time {
      font-size: 0.84rem;
      font-family: monospace;
      color: var(--text-muted);
    }

    .act-guest-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .act-guest-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.94rem;
    }

    .act-pass-type {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .act-event-col {
      flex: 1;
    }

    .act-event-name {
      font-size: 0.86rem;
      color: var(--text-secondary);
    }

    .act-status-col {
      text-align: right;
    }

    .empty-state {
      padding: 24px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class StaffDashboardComponent {
  private readonly authService = inject(AuthService);
  readonly staffData = inject(StaffDataService);
  private readonly router = inject(Router);

  readonly isUploadModalOpen = signal<boolean>(false);

  get staffFirstName(): string {
    const fullName = this.authService.currentUser()?.name || this.authService.currentUser()?.fullName || 'Arjun Menon';
    return fullName.split(' ')[0] || 'Arjun';
  }

  get recentActivities() {
    return this.staffData.activities().slice(0, 5);
  }

  getProgressPercent(event: StaffEvent): number {
    if (!event.expectedGuests) return 0;
    return Math.min(100, Math.round((event.checkedIn / event.expectedGuests) * 100));
  }

  openCheckIn(eventId: string): void {
    this.router.navigate(['/staff/check-in'], {
      queryParams: { eventId }
    });
  }
}
