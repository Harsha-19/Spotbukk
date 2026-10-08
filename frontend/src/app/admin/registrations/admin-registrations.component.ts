import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Booking } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="registrations-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Attendee Ledger</span>
          <h1 class="page-title">Registrations & Guestlist</h1>
          <p class="page-sub">Comprehensive ledger of all confirmed and pending attendees across gathering editions.</p>
        </div>

        <div class="header-actions">
          <button class="btn btn-outline btn-sm" (click)="exportCSV()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by attendee name, email, or booking reference..."
            class="form-control"
          />
        </div>

        <div class="filters-wrap">
          <select [(ngModel)]="selectedEventFilter" class="form-control select-filter">
            <option value="all">All Gatherings</option>
            <option *ngFor="let ev of eventService.events()" [value]="ev.id">
              {{ ev.title }} ({{ ev.city }})
            </option>
          </select>

          <select [(ngModel)]="selectedStatusFilter" class="form-control select-filter">
            <option value="all">All Payment Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <!-- Registrations Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Attendee & Reference</th>
                <th>Gathering</th>
                <th>Tier & Guests</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Booked On</th>
                <th>Door Status</th>
                <th class="text-right">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredBookings">
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.email }}</span>
                  <span class="cell-code font-mono">{{ b.id }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.eventCity }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.ticketTierName }}</span>
                  <span class="cell-secondary">{{ b.quantity }} pass{{ b.quantity > 1 ? 'es' : '' }}</span>
                </td>
                <td>
                  <span class="cell-primary">₹{{ b.totalAmount }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                  >
                    {{ b.paymentStatus }}
                  </span>
                  <span class="cell-secondary mt-1">{{ b.paymentMethod }}</span>
                </td>
                <td>
                  <span class="cell-secondary">{{ b.bookingDate | date:'mediumDate' }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [class.status-verified]="b.checkedIn"
                    [class.status-subtle]="!b.checkedIn"
                  >
                    {{ b.checkedIn ? 'Checked In' : 'Pending Door' }}
                  </span>
                </td>
                <td class="text-right">
                  <button class="btn btn-subtle btn-sm" (click)="openDetail(b)">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Attendee Detail Drawer / Modal -->
      <div class="modal-overlay" *ngIf="activeBooking" (click)="activeBooking = null">
        <div class="detail-drawer glass-panel" (click)="$event.stopPropagation()">
          <div class="drawer-header">
            <div>
              <span class="editorial-kicker">Registration Dossier</span>
              <h3 class="drawer-title">{{ activeBooking.customer.fullName }}</h3>
            </div>
            <button class="close-btn" (click)="activeBooking = null">&times;</button>
          </div>

          <div class="drawer-body">
            <div class="drawer-section">
              <span class="sec-label">Gathering</span>
              <p class="sec-primary">{{ activeBooking.eventTitle }} — {{ activeBooking.eventEdition }}</p>
              <p class="sec-sub">{{ activeBooking.eventDate }} · {{ activeBooking.eventVenue }}</p>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Contact Credentials</span>
              <div class="d-row">
                <span class="d-lbl">Email:</span>
                <span class="d-val">{{ activeBooking.customer.email }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Phone:</span>
                <span class="d-val">{{ activeBooking.customer.phone }}</span>
              </div>
              <div class="d-row" *ngIf="activeBooking.additionalGuests.length > 0">
                <span class="d-lbl">Accompanied Guests:</span>
                <span class="d-val">{{ activeBooking.additionalGuests.join(', ') }}</span>
              </div>
              <div class="d-row" *ngIf="activeBooking.specialRequests">
                <span class="d-lbl">Special Requests:</span>
                <span class="d-val">{{ activeBooking.specialRequests }}</span>
              </div>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Financial Audit</span>
              <div class="d-row">
                <span class="d-lbl">Tier:</span>
                <span class="d-val">{{ activeBooking.ticketTierName }} (&times;{{ activeBooking.quantity }})</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Subtotal:</span>
                <span class="d-val">₹{{ activeBooking.subtotal }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Fees:</span>
                <span class="d-val">₹{{ activeBooking.convenienceFee }}</span>
              </div>
              <div class="d-row total-highlight">
                <span class="d-lbl">Total Paid:</span>
                <span class="d-val">₹{{ activeBooking.totalAmount }}</span>
              </div>
              <div class="d-row">
                <span class="d-lbl">Transaction Ref:</span>
                <span class="d-val font-mono">{{ activeBooking.transactionId }}</span>
              </div>
            </div>

            <div class="drawer-section">
              <span class="sec-label">Door Check-In Action</span>
              <div class="checkin-action-bar">
                <span class="status-pill" [class.status-verified]="activeBooking.checkedIn" [class.status-subtle]="!activeBooking.checkedIn">
                  {{ activeBooking.checkedIn ? 'ENTRY VERIFIED' : 'NOT CHECKED IN' }}
                </span>
                <button
                  class="btn btn-primary btn-sm"
                  (click)="toggleActiveCheckIn()"
                >
                  {{ activeBooking.checkedIn ? 'Revoke Check-In' : 'Mark Checked In Now' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .registrations-page {
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

    .filters-wrap {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .select-filter {
      width: auto;
      min-width: 170px;
    }

    .table-card {
      border-radius: var(--radius-md);
      overflow: hidden;
      padding: 0;
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
      font-size: 0.72rem;
      color: var(--accent);
      display: block;
      margin-top: 2px;
    }

    .font-mono {
      font-family: monospace;
    }

    .mt-1 {
      margin-top: 4px;
    }

    .text-right {
      text-align: right;
    }

    /* Modal / Drawer */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      justify-content: flex-end;
    }

    .detail-drawer {
      width: 100%;
      max-width: 460px;
      height: 100%;
      background: var(--bg-surface-elevated);
      padding: 32px;
      overflow-y: auto;
      box-shadow: var(--shadow-drawer);
      display: flex;
      flex-direction: column;
    }

    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .drawer-title {
      font-size: 1.4rem;
    }

    .close-btn {
      font-size: 1.6rem;
      color: var(--text-muted);

      &:hover {
        color: var(--text-primary);
      }
    }

    .drawer-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .drawer-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .sec-label {
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
    }

    .sec-primary {
      font-weight: 700;
      font-size: 1rem;
    }

    .sec-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .d-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.84rem;

      .d-lbl {
        color: var(--text-muted);
      }

      .d-val {
        color: var(--text-primary);
        font-weight: 500;
      }

      &.total-highlight {
        font-weight: 700;
        color: var(--text-primary);
        padding-top: 6px;
        border-top: 1px dashed var(--border-subtle);
      }
    }

    .checkin-action-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
    }
  `]
})
export class AdminRegistrationsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  selectedEventFilter = 'all';
  selectedStatusFilter = 'all';

  activeBooking: Booking | null = null;

  get filteredBookings(): Booking[] {
    let list = this.eventService.bookings();

    if (this.selectedEventFilter !== 'all') {
      list = list.filter(b => b.eventId === this.selectedEventFilter);
    }

    if (this.selectedStatusFilter !== 'all') {
      list = list.filter(b => b.paymentStatus === this.selectedStatusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.customer.fullName.toLowerCase().includes(q) ||
        b.customer.email.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.ticketCode.toLowerCase().includes(q)
      );
    }

    return list;
  }

  openDetail(booking: Booking): void {
    this.activeBooking = booking;
  }

  toggleActiveCheckIn(): void {
    if (this.activeBooking) {
      this.eventService.toggleCheckIn(this.activeBooking.id);
      const updated = this.eventService.getBookingById(this.activeBooking.id);
      if (updated) {
        this.activeBooking = updated;
        this.toast.success(
          'Check-In Updated',
          `${updated.customer.fullName} is now ${updated.checkedIn ? 'marked checked in' : 'pending door'}.`
        );
      }
    }
  }

  exportCSV(): void {
    const rows = [
      ['Booking Reference', 'Customer Name', 'Email', 'Phone', 'Event', 'Tier', 'Qty', 'Amount', 'Payment', 'Status', 'Checked In']
    ];

    for (const b of this.filteredBookings) {
      rows.push([
        b.id,
        b.customer.fullName,
        b.customer.email,
        b.customer.phone,
        b.eventTitle,
        b.ticketTierName,
        String(b.quantity),
        String(b.totalAmount),
        b.paymentMethod,
        b.paymentStatus,
        b.checkedIn ? 'Yes' : 'No'
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(s => `"${s}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SpotBukk-registrations-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.toast.success('CSV Export Generated', `${this.filteredBookings.length} registrations downloaded.`);
  }
}
