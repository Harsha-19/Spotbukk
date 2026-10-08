import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-checkins',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkins-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Door Management</span>
          <h1 class="page-title">Door Check-Ins & Clearance</h1>
          <p class="page-sub">Monitor real-time guest arrivals, venue door clearance, and manual overrides.</p>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/scanner" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            </svg>
            Launch Camera QR Scanner
          </a>
        </div>
      </div>

      <!-- Realtime Gauge & Clearance Cards -->
      <div class="clearance-stats-grid">
        <div class="stat-card card-base">
          <span class="stat-lbl">Total Admitted Tickets</span>
          <div class="stat-val">{{ totalTickets }}</div>
          <span class="stat-sub">Across all confirmed bookings</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Checked In</span>
          <div class="stat-val text-success">{{ checkedInCount }}</div>
          <span class="stat-sub">Verified at door scanners</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Remaining to Arrive</span>
          <div class="stat-val">{{ remainingCount }}</div>
          <span class="stat-sub">Expected prior to curfew</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-lbl">Door Clearance</span>
          <div class="stat-val">{{ clearanceRate }}%</div>
          <div class="clearance-bar">
            <div class="bar-fill" [style.width.%]="clearanceRate"></div>
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search attendee, ticket code, or event..."
            class="form-control"
          />
        </div>

        <div class="filter-tabs">
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'all'"
            (click)="tabFilter = 'all'"
          >
            All Guests ({{ eventService.bookings().length }})
          </button>
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'checked'"
            (click)="tabFilter = 'checked'"
          >
            Checked In ({{ checkedInCount }})
          </button>
          <button
            class="filter-tab"
            [class.active]="tabFilter === 'pending'"
            (click)="tabFilter = 'pending'"
          >
            Pending Door ({{ remainingCount }})
          </button>
        </div>
      </div>

      <!-- Live Attendee Check-In Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Ticket Code</th>
                <th>Gathering</th>
                <th>Tier & Party</th>
                <th>Door Status</th>
                <th>Check-In Time</th>
                <th class="text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredAttendees">
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.phone }}</span>
                </td>
                <td>
                  <span class="cell-code font-mono">{{ b.ticketCode }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.eventCity }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.ticketTierName }}</span>
                  <span class="cell-secondary">{{ b.quantity }} Person{{ b.quantity > 1 ? 's' : '' }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [class.status-verified]="b.checkedIn"
                    [class.status-subtle]="!b.checkedIn"
                  >
                    {{ b.checkedIn ? 'ENTRY VERIFIED' : 'Pending Door' }}
                  </span>
                </td>
                <td>
                  <span class="cell-secondary font-mono" *ngIf="b.checkedIn">
                    {{ b.checkedInTime ? (b.checkedInTime | date:'shortTime') : 'Verified' }}
                  </span>
                  <span class="cell-secondary text-muted" *ngIf="!b.checkedIn">
                    —
                  </span>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-sm"
                    [class.btn-primary]="!b.checkedIn"
                    [class.btn-outline]="b.checkedIn"
                    (click)="toggleCheckIn(b)"
                  >
                    {{ b.checkedIn ? 'Undo Check-In' : 'One-Click Verify' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkins-admin-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 2rem;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .page-sub {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .clearance-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 580px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 20px;
      border-radius: var(--radius-md);

      .stat-lbl {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .stat-val {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .stat-sub {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
    }

    .text-success {
      color: var(--badge-success-text);
    }

    .clearance-bar {
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      margin-top: 8px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        background: var(--accent);
        border-radius: 2px;
      }
    }

    .toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      flex: 1;
      min-width: 260px;
    }

    .filter-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .filter-tab {
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--radius-xs);

      &.active {
        background: var(--bg-surface-elevated);
        color: var(--text-primary);
        box-shadow: var(--shadow-subtle);
      }
    }

    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-container {
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;

      th {
        padding: 14px 18px;
        background: var(--bg-surface-subtle);
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }

    .cell-code {
      font-size: 0.8rem;
      color: var(--accent);
    }

    .font-mono {
      font-family: monospace;
    }

    .text-right {
      text-align: right;
    }
  `]
})
export class AdminCheckinsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  tabFilter: 'all' | 'checked' | 'pending' = 'all';

  get totalTickets(): number {
    return this.eventService.totalTicketsSold();
  }

  get checkedInCount(): number {
    return this.eventService.bookings().filter(b => b.checkedIn).length;
  }

  get remainingCount(): number {
    return Math.max(0, this.totalTickets - this.checkedInCount);
  }

  get clearanceRate(): number {
    if (this.totalTickets === 0) return 0;
    return Math.round((this.checkedInCount / this.totalTickets) * 100);
  }

  get filteredAttendees(): Booking[] {
    let list = this.eventService.bookings();

    if (this.tabFilter === 'checked') {
      list = list.filter(b => b.checkedIn);
    } else if (this.tabFilter === 'pending') {
      list = list.filter(b => !b.checkedIn);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.customer.fullName.toLowerCase().includes(q) ||
        b.ticketCode.toLowerCase().includes(q) ||
        b.eventTitle.toLowerCase().includes(q)
      );
    }

    return list;
  }

  toggleCheckIn(booking: Booking): void {
    this.eventService.toggleCheckIn(booking.id);
    const updated = this.eventService.getBookingById(booking.id);
    if (updated) {
      if (updated.checkedIn) {
        this.toast.success('Check-In Verified', `${updated.customer.fullName} admitted.`);
      } else {
        this.toast.info('Check-In Reverted', `${updated.customer.fullName} reverted to pending.`);
      }
    }
  }
}
