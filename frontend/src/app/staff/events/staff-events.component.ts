import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StaffDataService } from '../services/staff-data.service';
import { StaffEvent } from '../../core/data/staff-seed.data';
import { MediaUploadModalComponent } from '../../shared/components/media-upload-modal/media-upload-modal.component';

@Component({
  selector: 'app-staff-events',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaUploadModalComponent],
  template: `
    <div class="staff-events-page container">
      <!-- Breadcrumb -->
      <div class="top-nav-bar">
        <a routerLink="/staff" class="back-link">&larr; Back to Dashboard</a>
      </div>

      <!-- Header -->
      <div class="page-header">
        <span class="editorial-kicker">SPOTBUKK &bull; VENUE OPERATIONS</span>
        <h1 class="page-title">Assigned Events</h1>
        <p class="page-subtitle">
          Events allocated to your operational clearance profile. Launch door clearance for active gates.
        </p>
      </div>

      <!-- Events List Cards -->
      <div class="events-container">
        <div *ngFor="let event of staffData.events()" class="event-card card-base">
          <div class="card-top-row">
            <div class="city-pill">{{ event.city }}</div>
            <div class="edition-tag" *ngIf="event.edition">{{ event.edition }}</div>
          </div>

          <h2 class="event-heading">{{ event.title }}</h2>

          <div class="meta-grid">
            <div class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div>
                <span class="meta-label">Date</span>
                <span class="meta-value">{{ event.date }}</span>
              </div>
            </div>

            <div class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <span class="meta-label">Timing</span>
                <span class="meta-value">{{ event.time }}</span>
              </div>
            </div>

            <div class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <span class="meta-label">Venue</span>
                <span class="meta-value">{{ event.venue }}, {{ event.city }}</span>
              </div>
            </div>
          </div>

          <!-- Capacity & Check-In Metric Box -->
          <div class="metrics-box">
            <div class="metric-col">
              <span class="metric-caption">Expected Guests</span>
              <span class="metric-val">{{ event.expectedGuests }}</span>
            </div>
            <div class="metric-col">
              <span class="metric-caption">Checked In</span>
              <span class="metric-val highlight-val">{{ event.checkedIn }}</span>
            </div>
            <div class="metric-col">
              <span class="metric-caption">Remaining</span>
              <span class="metric-val">{{ event.expectedGuests - event.checkedIn }}</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-wrap">
            <div class="progress-fill" [style.width.%]="getProgressPercent(event)"></div>
          </div>

          <!-- Action Buttons -->
          <div class="card-action-row">
            <button
              type="button"
              class="btn btn-primary btn-lg action-main-btn"
              (click)="openCheckIn(event.id)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              OPEN CHECK-IN
            </button>
            <button
              type="button"
              class="btn btn-subtle btn-lg action-upload-btn"
              (click)="openUploadModal(event)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload Media
            </button>
          </div>
        </div>
      </div>

      <!-- Media Upload Modal -->
      <app-media-upload-modal
        [isOpen]="isUploadModalOpen()"
        [fixedEventId]="selectedEventId()"
        [fixedEventTitle]="selectedEventTitle()"
        (close)="isUploadModalOpen.set(false)"
      ></app-media-upload-modal>
    </div>
  `,
  styles: [`
    .staff-events-page {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .top-nav-bar {
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
      font-size: 0.96rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .events-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
      }
    }

    .event-card {
      padding: 28px;
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: border-color var(--transition-fast), transform var(--transition-fast);

      &:hover {
        border-color: rgba(128, 0, 32, 0.45);
        transform: translateY(-2px);
      }
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .city-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      background: var(--bg-surface-elevated);
      color: var(--text-secondary);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid var(--border-subtle);
    }

    .edition-tag {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .event-heading {
      font-size: 1.55rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      margin: 0;
      color: var(--text-primary);
    }

    .meta-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--bg-surface-subtle);
      padding: 16px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }

    .meta-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;

      svg {
        color: var(--text-muted);
        margin-top: 2px;
        flex-shrink: 0;
      }
    }

    .meta-label {
      display: block;
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 700;
    }

    .meta-value {
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .metrics-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 14px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      text-align: center;
      border: 1px solid var(--border-subtle);
    }

    .metric-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-caption {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 700;
    }

    .metric-val {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);

      &.highlight-val {
        color: #ffb3c1;
      }
    }

    .progress-wrap {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #800020, #e11d48);
      border-radius: var(--radius-full);
      transition: width 0.4s ease;
    }

    .card-action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
    }

    .action-main-btn {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .action-upload-btn {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @media (max-width: 580px) {
      .card-action-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StaffEventsComponent {
  readonly staffData = inject(StaffDataService);
  private readonly router = inject(Router);

  readonly isUploadModalOpen = signal<boolean>(false);
  readonly selectedEventId = signal<string>('');
  readonly selectedEventTitle = signal<string>('');

  getProgressPercent(event: StaffEvent): number {
    if (!event.expectedGuests) return 0;
    return Math.min(100, Math.round((event.checkedIn / event.expectedGuests) * 100));
  }

  openCheckIn(eventId: string): void {
    this.router.navigate(['/staff/check-in'], {
      queryParams: { eventId }
    });
  }

  openUploadModal(event: StaffEvent): void {
    this.selectedEventId.set(event.id);
    this.selectedEventTitle.set(event.title);
    this.isUploadModalOpen.set(true);
  }
}
