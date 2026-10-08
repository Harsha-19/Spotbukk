import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Intelligence & Insights</span>
          <h1 class="page-title">Analytics & Enclave Audience</h1>
          <p class="page-sub">Audience retention, tier velocity, metro concentration, and sell-out performance.</p>
        </div>
      </div>

      <!-- Top KPI Row -->
      <div class="kpi-grid">
        <div class="kpi-card card-base">
          <span class="kpi-label">Average Fill Rate</span>
          <div class="kpi-val">87.4%</div>
          <span class="kpi-trend text-success">+6.2% vs previous quarter</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">Sellout Velocity</span>
          <div class="kpi-val">4.2 Days</div>
          <span class="kpi-trend">Average time to reach 80% cap</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">Repeat Guest Ratio</span>
          <div class="kpi-val">43%</div>
          <span class="kpi-trend text-success">High member loyalty</span>
        </div>

        <div class="kpi-card card-base">
          <span class="kpi-label">VIP Tier Absorption</span>
          <div class="kpi-val">100%</div>
          <span class="kpi-trend">VIP tiers sell out in < 24hrs</span>
        </div>
      </div>

      <!-- Tier Velocity & City Distribution (Editorial Charts) -->
      <div class="analytics-charts-grid">
        <!-- Ticket Tier Performance -->
        <div class="chart-box card-base">
          <div class="box-header">
            <span class="editorial-kicker">Revenue Contribution</span>
            <h3 class="box-title">Ticket Tier Distribution</h3>
          </div>

          <div class="tier-bars-list">
            <div class="tier-bar-item" *ngFor="let tier of tierBreakdown">
              <div class="tier-bar-labels">
                <span class="t-name">{{ tier.name }}</span>
                <span class="t-stats">{{ tier.share }}% (₹{{ tier.revenue | number }})</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="tier.share"></div>
              </div>
              <span class="tier-micro">{{ tier.count }} tickets sold · ₹{{ tier.avgPrice }} avg price</span>
            </div>
          </div>
        </div>

        <!-- City Distribution -->
        <div class="chart-box card-base">
          <div class="box-header">
            <span class="editorial-kicker">Geography</span>
            <h3 class="box-title">Metro Enclave Concentration</h3>
          </div>

          <div class="city-distribution-list">
            <div class="city-item" *ngFor="let c of cityMetrics">
              <div class="city-top">
                <span class="city-name">{{ c.city }}</span>
                <span class="city-percent">{{ c.share }}%</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="c.share"></div>
              </div>
              <div class="city-meta-sub">
                <span>{{ c.eventsCount }} Gatherings</span>
                <span>₹{{ c.volume | number }} Gross Volume</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Performance Matrix Table -->
      <div class="table-card card-base">
        <div class="table-header">
          <div>
            <span class="editorial-kicker">Comparative Audit</span>
            <h3 class="table-title">Gathering Performance Comparison</h3>
          </div>
        </div>

        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Gathering</th>
                <th>City & Date</th>
                <th>Capacity Sold</th>
                <th>Fill Rate</th>
                <th>Gross Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ev of eventService.events()">
                <td>
                  <span class="cell-primary">{{ ev.title }}</span>
                  <span class="cell-secondary">{{ ev.edition }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.city }}</span>
                  <span class="cell-secondary">{{ ev.date }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                </td>
                <td>
                  <div class="fill-rate-cell">
                    <span class="fill-number">{{ ((ev.ticketsSold / ev.capacity) * 100).toFixed(0) }}%</span>
                    <div class="bar-track min-w-80">
                      <div class="bar-fill" [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cell-primary font-bold">₹{{ (ev.ticketsSold * ev.startingPrice * 1.25) | number:'1.0-0' }}</span>
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
    </div>
  `,
  styles: [`
    .analytics-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
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

    /* KPI Grid */
    .kpi-grid {
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

    .kpi-card {
      padding: 24px;
      border-radius: var(--radius-md);

      .kpi-label {
        font-family: var(--font-display);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        display: block;
        margin-bottom: 8px;
      }

      .kpi-val {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .kpi-trend {
        font-size: 0.75rem;
        color: var(--text-secondary);

        &.text-success {
          color: var(--badge-success-text);
        }
      }
    }

    /* Charts Grid */
    .analytics-charts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .chart-box {
      padding: 28px;
      border-radius: var(--radius-lg);
    }

    .box-header {
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .box-title {
      font-size: 1.25rem;
    }

    .tier-bars-list,
    .city-distribution-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .tier-bar-labels,
    .city-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 0.88rem;
    }

    .t-name,
    .city-name {
      font-family: var(--font-display);
      font-weight: 700;
    }

    .t-stats,
    .city-percent {
      color: var(--text-muted);
      font-size: 0.82rem;
    }

    .bar-track {
      height: 6px;
      background: var(--bg-surface-elevated);
      border-radius: 3px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 3px;
      transition: width 400ms ease;
    }

    .tier-micro,
    .city-meta-sub {
      display: flex;
      justify-content: space-between;
      font-size: 0.74rem;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* Table */
    .table-card {
      padding: 0;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-header {
      padding: 24px 24px 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .table-title {
      font-size: 1.2rem;
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
        padding: 16px 18px;
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

    .font-bold {
      font-weight: 700;
    }

    .fill-rate-cell {
      display: flex;
      align-items: center;
      gap: 10px;

      .fill-number {
        font-family: var(--font-display);
        font-size: 0.82rem;
        font-weight: 700;
        min-width: 32px;
      }

      .min-w-80 {
        width: 80px;
      }
    }
  `]
})
export class AdminAnalyticsComponent {
  readonly eventService = inject(EventService);

  readonly tierBreakdown = [
    { name: 'VIP Access & Mezzanine', share: 44, revenue: 433180, count: 290, avgPrice: 1493 },
    { name: 'Regular Admission', share: 38, revenue: 374110, count: 520, avgPrice: 719 },
    { name: 'Early Bird Pass', share: 18, revenue: 177210, count: 310, avgPrice: 571 }
  ];

  readonly cityMetrics = [
    { city: 'Bengaluru (Indiranagar & Lavelle)', share: 42, eventsCount: 3, volume: 413490 },
    { city: 'Mumbai (Worli & Lower Parel)', share: 31, eventsCount: 2, volume: 305195 },
    { city: 'Goa (Vagator Clifftop)', share: 17, eventsCount: 1, volume: 167365 },
    { city: 'Delhi (Mehrauli Farmhouse)', share: 10, eventsCount: 1, volume: 98450 }
  ];
}
