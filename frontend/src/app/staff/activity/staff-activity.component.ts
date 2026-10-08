import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StaffDataService } from '../services/staff-data.service';
import { CheckInActivityItem } from '../../core/data/staff-seed.data';

@Component({
  selector: 'app-staff-activity',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="staff-activity-page container">
      <!-- Breadcrumb & Header -->
      <div class="top-bar">
        <a routerLink="/staff" class="back-link">&larr; Back to Dashboard</a>
        <a routerLink="/staff/check-in" class="btn btn-primary btn-sm">
          Open Scanner &rarr;
        </a>
      </div>

      <div class="header-section">
        <div>
          <span class="editorial-kicker">SPOTBUKK &bull; DOOR CLEARANCE LOG</span>
          <h1 class="page-title">TODAY'S CHECK-IN ACTIVITY</h1>
          <p class="page-subtitle">Real-time gate clearance ledger and admission audit</p>
        </div>
        <div class="activity-summary-pill">
          <span class="pulse-dot"></span>
          <span>{{ filteredActivities().length }} Records Today</span>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="toolbar-card card-base">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search attendee or ticket code..."
            class="search-input"
          />
        </div>

        <div class="filters-group">
          <!-- Status Filter -->
          <div class="filter-item">
            <label class="filter-label" for="status-filter">Status:</label>
            <select id="status-filter" [(ngModel)]="selectedStatus" class="filter-select">
              <option value="ALL">All Outcomes</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="ALREADY USED">ALREADY USED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="WRONG EVENT">WRONG EVENT</option>
            </select>
          </div>

          <!-- Event Filter -->
          <div class="filter-item">
            <label class="filter-label" for="event-filter">Event:</label>
            <select id="event-filter" [(ngModel)]="selectedEvent" class="filter-select">
              <option value="ALL">All Events</option>
              <option *ngFor="let ev of staffData.events()" [value]="ev.title">
                {{ ev.title }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Activity Items List (Compact Rows) -->
      <div class="activity-list-container card-base">
        <div *ngIf="filteredActivities().length === 0" class="empty-state">
          No check-in records matching the current filters.
        </div>

        <div
          *ngFor="let item of filteredActivities()"
          class="activity-row"
          [class.success-row]="item.status === 'SUCCESS'"
          [class.warning-row]="item.status === 'ALREADY USED'"
          [class.error-row]="item.status !== 'SUCCESS' && item.status !== 'ALREADY USED'"
        >
          <!-- Column 1: Time Stamp -->
          <div class="col-time">
            <span class="time-badge">{{ item.time }}</span>
            <span class="gate-tag">{{ item.gate }}</span>
          </div>

          <!-- Column 2: Attendee & Ticket Info -->
          <div class="col-guest">
            <span class="guest-name">{{ item.guestName }}</span>
            <div class="guest-sub">
              <span class="pass-name">{{ item.passType }}</span>
              <span class="code-pill" *ngIf="item.ticketCode">{{ item.ticketCode }}</span>
            </div>
          </div>

          <!-- Column 3: Event -->
          <div class="col-event">
            <span class="event-title">{{ item.eventTitle }}</span>
          </div>

          <!-- Column 4: Status Outcome -->
          <div class="col-status">
            <span
              class="status-pill"
              [class.status-success]="item.status === 'SUCCESS'"
              [class.status-warning]="item.status === 'ALREADY USED'"
              [class.status-error]="item.status !== 'SUCCESS' && item.status !== 'ALREADY USED'"
            >
              {{ item.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .staff-activity-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 16px;
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
      font-size: 2.1rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
    }

    .page-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .activity-summary-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
    }

    /* Toolbar */
    .toolbar-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 14px;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 8px 12px;
      flex: 1;
      min-width: 260px;
      max-width: 420px;

      svg {
        color: var(--text-muted);
      }
    }

    .search-input {
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 0.88rem;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    .filters-group {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .filter-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .filter-select {
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 6px 10px;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: var(--accent);
      }
    }

    /* List Container */
    .activity-list-container {
      background: var(--bg-surface);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .activity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-subtle);
      gap: 16px;
      transition: background var(--transition-fast);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: var(--bg-surface-elevated);
      }

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }

    .col-time {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 100px;
    }

    .time-badge {
      font-family: monospace;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .gate-tag {
      font-size: 0.74rem;
      color: var(--text-muted);
    }

    .col-guest {
      flex: 1.5;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .guest-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .guest-sub {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .pass-name {
      font-size: 0.82rem;
      color: #ffb3c1;
      font-weight: 500;
    }

    .code-pill {
      font-family: monospace;
      font-size: 0.72rem;
      padding: 1px 6px;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-xs);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .col-event {
      flex: 1.2;
    }

    .event-title {
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .col-status {
      min-width: 130px;
      text-align: right;

      @media (max-width: 768px) {
        text-align: left;
      }
    }

    .empty-state {
      padding: 48px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.92rem;
    }
  `]
})
export class StaffActivityComponent {
  readonly staffData = inject(StaffDataService);

  searchQuery = '';
  selectedStatus = 'ALL';
  selectedEvent = 'ALL';

  readonly filteredActivities = computed(() => {
    let list = this.staffData.activities();

    if (this.selectedStatus !== 'ALL') {
      list = list.filter(item => item.status === this.selectedStatus);
    }

    if (this.selectedEvent !== 'ALL') {
      list = list.filter(item => item.eventTitle === this.selectedEvent);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(
        item =>
          item.guestName.toLowerCase().includes(q) ||
          item.passType.toLowerCase().includes(q) ||
          item.eventTitle.toLowerCase().includes(q) ||
          (item.ticketCode && item.ticketCode.toLowerCase().includes(q))
      );
    }

    return list;
  });
}
