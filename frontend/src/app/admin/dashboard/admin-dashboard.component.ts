import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <!-- Page Title & Header -->
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Performance & Capacity</span>
          <h1 class="page-title">Executive Dashboard</h1>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/events/create" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Event
          </a>
        </div>
      </div>

      <!-- 1. STATISTICAL BLOCKS -->
      <div class="stats-grid">
        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Upcoming Events</span>
            <span class="stat-growth-tag">+2 this month</span>
          </div>
          <div class="stat-metric">{{ eventService.upcomingEventsCount() }}</div>
          <div class="stat-sub">Active curated calendars</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Tickets Sold</span>
            <span class="stat-growth-tag">+18% vs LW</span>
          </div>
          <div class="stat-metric">{{ eventService.totalTicketsSold() }}</div>
          <div class="stat-sub">Across 4 major metro enclaves</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Gross Revenue</span>
            <span class="stat-growth-tag font-bold">₹{{ eventService.totalRevenue() | number }}</span>
          </div>
          <div class="stat-metric">₹{{ (eventService.totalRevenue() / 1000).toFixed(1) }}k</div>
          <div class="stat-sub">Average Order: ₹1,640</div>
        </div>

        <div class="stat-card card-base">
          <div class="stat-top">
            <span class="stat-title">Door Check-Ins</span>
            <span class="stat-growth-tag">Active</span>
          </div>
          <div class="stat-metric">{{ eventService.totalCheckedIn() }}</div>
          <div class="stat-sub">{{ ((eventService.totalCheckedIn() / (eventService.totalTicketsSold() || 1)) * 100).toFixed(0) }}% door clearance rate</div>
        </div>
      </div>

      <!-- 2. REVENUE OVERVIEW CHART (Tasteful Editorial SVG Chart) -->
      <div class="chart-card card-base">
        <div class="chart-header">
          <div>
            <span class="editorial-kicker">Financial Trajectory</span>
            <h3 class="chart-title">Revenue Trajectory & Bookings</h3>
          </div>
          <div class="chart-period-tabs">
            <button
              class="period-tab"
              [class.active]="chartView === 'weekly'"
              (click)="chartView = 'weekly'"
            >
              Weekly
            </button>
            <button
              class="period-tab"
              [class.active]="chartView === 'monthly'"
              (click)="chartView = 'monthly'"
            >
              Monthly
            </button>
          </div>
        </div>

        <!-- Clean SVG Bar/Area Visualization -->
        <div class="chart-visual-area">
          <svg viewBox="0 0 800 240" class="editorial-svg-chart" preserveAspectRatio="none">
            <!-- Grid Lines -->
            <line x1="40" y1="40" x2="780" y2="40" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="100" x2="780" y2="100" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="160" x2="780" y2="160" stroke="var(--border-subtle)" stroke-dasharray="3,3" />
            <line x1="40" y1="210" x2="780" y2="210" stroke="var(--border-medium)" />

            <!-- Area polygon -->
            <polygon
              [attr.points]="chartView === 'weekly' ? weeklyAreaPoints : monthlyAreaPoints"
              fill="var(--accent-subtle)"
            />

            <!-- Stroke Path -->
            <polyline
              [attr.points]="chartView === 'weekly' ? weeklyLinePoints : monthlyLinePoints"
              fill="none"
              stroke="var(--accent)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- Data Point Circles -->
            <g *ngFor="let pt of currentPoints; let i = index">
              <circle
                [attr.cx]="pt.x"
                [attr.cy]="pt.y"
                r="4.5"
                fill="var(--bg-surface-elevated)"
                stroke="var(--accent)"
                stroke-width="2"
              />
              <text
                [attr.x]="pt.x"
                [attr.y]="pt.y - 10"
                font-family="'Syne', sans-serif"
                font-size="10"
                font-weight="700"
                fill="var(--text-secondary)"
                text-anchor="middle"
              >
                ₹{{ pt.amount }}k
              </text>
              <text
                [attr.x]="pt.x"
                y="230"
                font-size="11"
                fill="var(--text-muted)"
                text-anchor="middle"
              >
                {{ pt.label }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 3. SPLIT TABLES (Upcoming Events + Recent Registrations) -->
      <div class="tables-split-grid">
        <!-- Upcoming Events -->
        <div class="table-card card-base">
          <div class="card-table-header">
            <div>
              <span class="editorial-kicker">Active Gatherings</span>
              <h3 class="table-title">Upcoming Schedule</h3>
            </div>
            <a routerLink="/admin/events" class="table-link">Manage All &rarr;</a>
          </div>

          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date & City</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ev of eventService.events().slice(0, 4)">
                  <td>
                    <div class="table-event-cell">
                      <img [src]="ev.heroImage" [alt]="ev.title" class="cell-thumb" />
                      <div>
                        <span class="cell-primary">{{ ev.title }}</span>
                        <span class="cell-secondary">{{ ev.edition }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="cell-primary">{{ ev.city }}</span>
                    <span class="cell-secondary">{{ ev.date }}</span>
                  </td>
                  <td>
                    <div class="capacity-bar-wrap">
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"
                        ></div>
                      </div>
                      <span class="cap-text">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="status-pill" [ngClass]="'status-' + ev.status">
                      {{ ev.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Registrations -->
        <div class="table-card card-base">
          <div class="card-table-header">
            <div>
              <span class="editorial-kicker">Live Transactions</span>
              <h3 class="table-title">Recent Registrations</h3>
            </div>
            <a routerLink="/admin/registrations" class="table-link">View All &rarr;</a>
          </div>

          <div class="table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Attendee</th>
                  <th>Gathering</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of eventService.bookings().slice(0, 5)">
                  <td>
                    <span class="cell-primary">{{ b.customer.fullName }}</span>
                    <span class="cell-secondary font-mono">{{ b.ticketCode }}</span>
                  </td>
                  <td>
                    <span class="cell-primary">{{ b.eventTitle }}</span>
                    <span class="cell-secondary">{{ b.ticketTierName }} (&times;{{ b.quantity }})</span>
                  </td>
                  <td>
                    <span class="cell-primary">₹{{ b.totalAmount }}</span>
                    <span class="cell-secondary">{{ b.paymentMethod }}</span>
                  </td>
                  <td>
                    <span
                      class="status-pill"
                      [ngClass]="'status-' + b.paymentStatus.toLowerCase()"
                    >
                      {{ b.paymentStatus }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
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
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .stat-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .stat-title {
      font-family: var(--font-display);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .stat-growth-tag {
      font-size: 0.72rem;
      color: var(--badge-success-text);
      font-weight: 600;

      &.font-bold {
        font-weight: 700;
      }
    }

    .stat-metric {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 8px;
    }

    .stat-sub {
      font-size: 0.78rem;
      color: var(--text-secondary);
    }

    /* Chart */
    .chart-card {
      padding: 28px;
      border-radius: var(--radius-lg);
    }

    .chart-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .chart-title {
      font-size: 1.25rem;
    }

    .chart-period-tabs {
      display: flex;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 3px;
    }

    .period-tab {
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

    .chart-visual-area {
      width: 100%;
      overflow-x: auto;
    }

    .editorial-svg-chart {
      width: 100%;
      height: 220px;
      min-width: 600px;
    }

    /* Tables Grid */
    .tables-split-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 1080px) {
        grid-template-columns: 1fr;
      }
    }

    .table-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .card-table-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .table-title {
      font-size: 1.15rem;
    }

    .table-link {
      font-size: 0.82rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
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
        padding: 10px 12px;
        font-family: var(--font-display);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-subtle);
      }

      td {
        padding: 14px 12px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .table-event-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cell-thumb {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      object-fit: cover;
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
      letter-spacing: 0.05em;
    }

    .capacity-bar-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 110px;
    }

    .bar-track {
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
    }

    .cap-text {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
  `]
})
export class AdminDashboardComponent {
  readonly eventService = inject(EventService);

  chartView: 'weekly' | 'monthly' = 'weekly';

  readonly weeklyData = [
    { label: 'Mon', amount: 48, x: 90, y: 150 },
    { label: 'Tue', amount: 82, x: 200, y: 110 },
    { label: 'Wed', amount: 115, x: 310, y: 80 },
    { label: 'Thu', amount: 164, x: 420, y: 55 },
    { label: 'Fri', amount: 240, x: 530, y: 35 },
    { label: 'Sat', amount: 295, x: 640, y: 20 },
    { label: 'Sun', amount: 190, x: 740, y: 48 }
  ];

  readonly monthlyData = [
    { label: 'Jun', amount: 320, x: 90, y: 140 },
    { label: 'Jul', amount: 480, x: 220, y: 95 },
    { label: 'Aug', amount: 620, x: 350, y: 65 },
    { label: 'Sep', amount: 790, x: 480, y: 45 },
    { label: 'Oct', amount: 984, x: 610, y: 22 },
    { label: 'Nov (Proj)', amount: 1200, x: 740, y: 15 }
  ];

  get currentPoints() {
    return this.chartView === 'weekly' ? this.weeklyData : this.monthlyData;
  }

  get weeklyLinePoints(): string {
    return this.weeklyData.map(p => `${p.x},${p.y}`).join(' ');
  }

  get weeklyAreaPoints(): string {
    return `90,210 ${this.weeklyLinePoints} 740,210`;
  }

  get monthlyLinePoints(): string {
    return this.monthlyData.map(p => `${p.x},${p.y}`).join(' ');
  }

  get monthlyAreaPoints(): string {
    return `90,210 ${this.monthlyLinePoints} 740,210`;
  }
}
