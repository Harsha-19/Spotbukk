import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Booking, PaymentStatus } from '../../core/models/booking.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payments-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Financial Ledger</span>
          <h1 class="page-title">Payments & Gateway Audit</h1>
          <p class="page-sub">Settlements, transaction statuses, and payment reconciliation logs.</p>
        </div>
      </div>

      <!-- Financial Metrics Summary -->
      <div class="payment-metrics-grid">
        <div class="metric-card card-base">
          <span class="m-lbl">Gross Volume</span>
          <div class="m-val">₹{{ grossVolume | number }}</div>
          <span class="m-sub text-success">98.2% settlement rate</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Successful Transactions</span>
          <div class="m-val">{{ successCount }}</div>
          <span class="m-sub">Across UPI, Cards, Net Banking</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Refunded / Disputed</span>
          <div class="m-val">₹{{ refundedVolume | number }}</div>
          <span class="m-sub text-muted">1.4% refund frequency</span>
        </div>

        <div class="metric-card card-base">
          <span class="m-lbl">Average Order Value</span>
          <div class="m-val">₹{{ averageOrderValue }}</div>
          <span class="m-sub">₹948 per guest ticket average</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="toolbar card-base">
        <div class="search-input-wrap">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by Transaction ID, attendee, or event..."
            class="form-control"
          />
        </div>

        <div class="status-tabs">
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'all'"
            (click)="statusFilter = 'all'"
          >
            All
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Successful'"
            (click)="statusFilter = 'Successful'"
          >
            Successful
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Pending'"
            (click)="statusFilter = 'Pending'"
          >
            Pending
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Refunded'"
            (click)="statusFilter = 'Refunded'"
          >
            Refunded
          </button>
          <button
            class="filter-tab"
            [class.active]="statusFilter === 'Failed'"
            (click)="statusFilter = 'Failed'"
          >
            Failed
          </button>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Attendee</th>
                <th>Gathering</th>
                <th>Amount</th>
                <th>Gateway & Rail</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of filteredPayments">
                <td>
                  <span class="cell-primary font-mono">{{ b.transactionId }}</span>
                  <span class="cell-secondary font-mono">{{ b.id }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.customer.fullName }}</span>
                  <span class="cell-secondary">{{ b.customer.email }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.eventTitle }}</span>
                  <span class="cell-secondary">{{ b.ticketTierName }} ({{ b.quantity }})</span>
                </td>
                <td>
                  <span class="cell-primary font-bold">₹{{ b.totalAmount }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ b.paymentMethod }}</span>
                  <span class="cell-secondary">SpotBukk Gateway</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                  >
                    {{ b.paymentStatus }}
                  </span>
                </td>
                <td>
                  <span class="cell-secondary">{{ b.bookingDate | date:'medium' }}</span>
                </td>
                <td class="text-right">
                  <button
                    class="btn btn-subtle btn-sm"
                    *ngIf="b.paymentStatus === 'Successful'"
                    (click)="refundTransaction(b)"
                  >
                    Refund
                  </button>
                  <span *ngIf="b.paymentStatus !== 'Successful'" class="text-muted font-xs">
                    Archived
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payments-admin-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      margin-bottom: 8px;
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

    .payment-metrics-grid {
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

    .metric-card {
      padding: 20px;
      border-radius: var(--radius-md);

      .m-lbl {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .m-val {
        font-family: var(--font-display);
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .m-sub {
        font-size: 0.75rem;
      }
    }

    .text-success {
      color: var(--badge-success-text);
    }

    .text-muted {
      color: var(--text-muted);
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

    .status-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .filter-tab {
      padding: 6px 12px;
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

    .font-mono {
      font-family: monospace;
    }

    .font-bold {
      font-weight: 700;
    }

    .font-xs {
      font-size: 0.75rem;
    }

    .text-right {
      text-align: right;
    }
  `]
})
export class AdminPaymentsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  statusFilter = 'all';

  get grossVolume(): number {
    return this.eventService.bookings()
      .filter(b => b.paymentStatus === 'Successful')
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }

  get successCount(): number {
    return this.eventService.bookings().filter(b => b.paymentStatus === 'Successful').length;
  }

  get refundedVolume(): number {
    return this.eventService.bookings()
      .filter(b => b.paymentStatus === 'Refunded')
      .reduce((sum, b) => sum + b.totalAmount, 0);
  }

  get averageOrderValue(): number {
    const list = this.eventService.bookings().filter(b => b.paymentStatus === 'Successful');
    if (list.length === 0) return 0;
    return Math.round(this.grossVolume / list.length);
  }

  get filteredPayments(): Booking[] {
    let list = this.eventService.bookings();

    if (this.statusFilter !== 'all') {
      list = list.filter(b => b.paymentStatus === this.statusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(b =>
        b.transactionId.toLowerCase().includes(q) ||
        b.customer.fullName.toLowerCase().includes(q) ||
        b.eventTitle.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }

    return list;
  }

  refundTransaction(b: Booking): void {
    if (confirm(`Authorize full refund of ₹${b.totalAmount} for ${b.customer.fullName}?`)) {
      this.eventService.updatePaymentStatus(b.id, 'Refunded');
      this.toast.info('Refund Initiated', `₹${b.totalAmount} reversed for booking ${b.id}`);
    }
  }
}
