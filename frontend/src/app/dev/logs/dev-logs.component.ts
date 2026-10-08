import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationLoggerService, NavigationLogRecord } from '../../core/services/navigation-logger.service';

@Component({
  selector: 'app-dev-logs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="dev-logs-container">
      <div class="container">
        <!-- HEADER SECTION -->
        <header class="dev-header">
          <div class="header-left">
            <div class="kicker-row">
              <span class="editorial-kicker">SYSTEM TELEMETRY // INTERNAL DEBUG</span>
              <span class="status-live-pill">
                <span class="live-dot"></span>
                Router Event Bus Active
              </span>
            </div>
            <h1 class="dev-title">Navigation & Route Telemetry</h1>
            <p class="dev-subtitle">
              Observing real-time router events, execution timings, network interface captures, and persistent browser storage.
            </p>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="header-actions">
            <button (click)="refreshLogs()" class="btn-dev btn-secondary" title="Re-read records from localStorage">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
              Refresh Logs
            </button>
            <button (click)="clearLogs()" class="btn-dev btn-danger" title="Clear all stored logs">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
              </svg>
              Clear Logs
            </button>
            <button (click)="exportJson()" class="btn-dev btn-primary" title="Download logs as JSON file">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Export Logs as JSON
            </button>
          </div>
        </header>

        <!-- STATS BAR -->
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">TOTAL STORED RECORDS</span>
            <span class="stat-value">{{ logs().length }} <small>/ 500 max</small></span>
          </div>
          <div class="stat-card">
            <span class="stat-label">COMPLETED TRANSITIONS</span>
            <span class="stat-value highlight-success">{{ completedCount() }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">AVG TRANSITION LATENCY</span>
            <span class="stat-value">{{ avgDuration() }}<small>ms</small></span>
          </div>
          <div class="stat-card">
            <span class="stat-label">ERRORS / CANCELS</span>
            <span class="stat-value" [class.highlight-error]="errorCount() > 0">{{ errorCount() }}</span>
          </div>
        </div>

        <!-- QUICK ROUTE TESTER -->
        <div class="quick-tester-card">
          <div class="tester-header">
            <span class="tester-title">QUICK ROUTE TRIGGER BENCHMARK</span>
            <span class="tester-hint">Click any target to test router transition and logging</span>
          </div>
          <div class="tester-links">
            <button (click)="navigateTo('/')" class="test-pill">/ (Home)</button>
            <button (click)="navigateTo('/events')" class="test-pill">/events</button>
            <button (click)="navigateTo('/events/after-dark-vol-04')" class="test-pill">/events/after-dark-vol-04</button>
            <button (click)="navigateTo('/events/after-dark-vol-04/register')" class="test-pill">/events/.../register</button>
            <button (click)="navigateTo('/checkout')" class="test-pill">/checkout</button>
            <button (click)="navigateTo('/payment-success')" class="test-pill">/payment-success</button>
            <button (click)="navigateTo('/check-in')" class="test-pill">/check-in</button>
            <button (click)="navigateTo('/admin')" class="test-pill">/admin</button>
            <button (click)="navigateTo('/admin/events')" class="test-pill">/admin/events</button>
            <button (click)="navigateTo('/admin/analytics')" class="test-pill">/admin/analytics</button>
            <button (click)="navigateTo('/dev/logs')" class="test-pill active">/dev/logs</button>
          </div>
        </div>

        <!-- FILTER & SEARCH TOOLBAR -->
        <div class="filter-toolbar">
          <div class="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search by URL, event, ID, or status..."
              class="search-input"
            />
            <button *ngIf="searchQuery" (click)="searchQuery = ''" class="clear-search-btn">✕</button>
          </div>

          <div class="filter-pills">
            <button
              [class.active]="selectedFilter === 'all'"
              (click)="selectedFilter = 'all'"
              class="filter-pill"
            >
              All Events ({{ logs().length }})
            </button>
            <button
              [class.active]="selectedFilter === 'NavigationEnd'"
              (click)="selectedFilter = 'NavigationEnd'"
              class="filter-pill"
            >
              NavigationEnd ({{ countEvent('NavigationEnd') }})
            </button>
            <button
              [class.active]="selectedFilter === 'NavigationStart'"
              (click)="selectedFilter = 'NavigationStart'"
              class="filter-pill"
            >
              NavigationStart ({{ countEvent('NavigationStart') }})
            </button>
            <button
              [class.active]="selectedFilter === 'failures'"
              (click)="selectedFilter = 'failures'"
              class="filter-pill"
            >
              Errors & Cancels ({{ errorCount() }})
            </button>
          </div>
        </div>

        <!-- LOGS TABLE -->
        <div class="table-wrapper">
          <table class="dev-table" *ngIf="filteredLogs().length > 0; else noLogsTemplate">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event</th>
                <th>From</th>
                <th>To</th>
                <th>Navigation ID</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of filteredLogs(); trackBy: trackByRecord" [class.row-highlight-error]="record.status === 'error' || record.status === 'cancelled'">
                <td class="col-timestamp">
                  <div class="time-main">{{ formatDisplayTime(record.timestamp) }}</div>
                  <div class="time-sub">{{ formatDisplayDate(record.timestamp) }}</div>
                </td>
                <td class="col-event">
                  <span class="event-badge" [attr.data-event]="record.event">
                    {{ record.event }}
                  </span>
                </td>
                <td class="col-from">
                  <span class="route-badge">{{ record.from || '/' }}</span>
                </td>
                <td class="col-to">
                  <span class="route-badge active-route">{{ record.to }}</span>
                  <div *ngIf="record.reason" class="record-meta-note">Reason: {{ record.reason }}</div>
                  <div *ngIf="record.error" class="record-meta-error">Err: {{ record.error }}</div>
                </td>
                <td class="col-id">
                  <span class="id-tag">#{{ record.navigationId }}</span>
                </td>
                <td class="col-duration">
                  <span *ngIf="record.durationMs > 0; else noDuration" class="duration-badge">
                    {{ record.durationMs }}ms
                  </span>
                  <ng-template #noDuration>
                    <span class="duration-empty">-</span>
                  </ng-template>
                </td>
                <td class="col-status">
                  <span class="status-pill" [attr.data-status]="record.status">
                    <span class="status-indicator"></span>
                    {{ record.status | uppercase }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <ng-template #noLogsTemplate>
            <div class="empty-state">
              <div class="empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 class="empty-title">No Navigation Logs Recorded</h3>
              <p class="empty-desc">
                {{ searchQuery ? 'No logs match your current search criteria.' : 'Navigate between pages or click the benchmark links above to record events.' }}
              </p>
            </div>
          </ng-template>
        </div>

        <!-- FOOTER INFO -->
        <footer class="dev-footer">
          <div class="footer-info">
            <span>Storage Key: <code>SpotBukk_navigation_logs</code></span>
            <span>Max Ring Buffer: <code>500 entries</code></span>
            <span>Interface: <code>0.0.0.0:4300</code></span>
          </div>
          <div class="footer-hint">
            Direct console mirror available in browser DevTools with tag <code>[SpotBukk ROUTER]</code>
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .dev-logs-container {
      min-height: calc(100vh - 160px);
      padding: 40px 0 80px;
      background: var(--bg-page);
      color: var(--text-primary);
      font-family: var(--font-body);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* HEADER */
    .dev-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      gap: 24px;
      flex-wrap: wrap;
    }

    .kicker-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .editorial-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--accent);
    }

    .status-live-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(46, 117, 89, 0.15);
      border: 1px solid rgba(104, 196, 158, 0.3);
      color: #68c49e;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #68c49e;
      box-shadow: 0 0 8px #68c49e;
    }

    .dev-title {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0 0 8px;
    }

    .dev-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 680px;
      line-height: 1.5;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-dev {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-primary {
      background: var(--accent);
      color: #ffffff;
      border-color: var(--accent);
    }
    .btn-primary:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      border-color: var(--border-medium);
    }
    .btn-secondary:hover {
      background: var(--bg-surface-subtle);
      border-color: var(--border-strong);
    }

    .btn-danger {
      background: rgba(139, 29, 49, 0.15);
      color: #ff6b81;
      border-color: rgba(255, 107, 129, 0.3);
    }
    .btn-danger:hover {
      background: rgba(139, 29, 49, 0.3);
      border-color: #ff6b81;
    }

    /* STATS GRID */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .stat-label {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--text-primary);
    }
    .stat-value small {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-left: 4px;
    }

    .highlight-success {
      color: #68c49e;
    }
    .highlight-error {
      color: #ff6b81;
    }

    /* QUICK ROUTE TESTER */
    .quick-tester-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 18px 22px;
      margin-bottom: 24px;
    }

    .tester-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tester-title {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
    }

    .tester-hint {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .tester-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .test-pill {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: monospace;
      font-size: 0.8rem;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .test-pill:hover {
      background: var(--bg-surface-subtle);
      color: var(--text-primary);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .test-pill.active {
      border-color: var(--accent);
      color: var(--accent);
      background: var(--accent-subtle);
    }

    /* FILTER TOOLBAR */
    .filter-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 320px;
      flex: 1;
      max-width: 480px;
    }
    .search-box svg {
      position: absolute;
      left: 14px;
      color: var(--text-muted);
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px 36px 10px 40px;
      color: var(--text-primary);
      font-size: 0.88rem;
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .clear-search-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
    }

    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-pill {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .filter-pill:hover {
      border-color: var(--border-medium);
      color: var(--text-primary);
    }
    .filter-pill.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
    }

    /* TABLE */
    .table-wrapper {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow-x: auto;
      box-shadow: var(--shadow-subtle);
    }

    .dev-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.86rem;
    }

    .dev-table th {
      background: var(--bg-surface-elevated);
      color: var(--text-muted);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      white-space: nowrap;
    }

    .dev-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      vertical-align: middle;
    }

    .dev-table tbody tr {
      transition: background var(--transition-fast);
    }
    .dev-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .row-highlight-error {
      background: rgba(255, 107, 129, 0.04) !important;
    }

    /* TABLE CELL STYLES */
    .col-timestamp {
      white-space: nowrap;
    }
    .time-main {
      font-family: monospace;
      font-weight: 700;
      color: var(--text-primary);
      font-size: 0.88rem;
    }
    .time-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .event-badge {
      display: inline-block;
      font-family: monospace;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: var(--radius-xs);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
    }
    .event-badge[data-event='NavigationEnd'] {
      background: rgba(46, 117, 89, 0.15);
      border-color: rgba(104, 196, 158, 0.3);
      color: #68c49e;
    }
    .event-badge[data-event='NavigationStart'] {
      background: rgba(74, 144, 226, 0.15);
      border-color: rgba(74, 144, 226, 0.3);
      color: #70a1ff;
    }
    .event-badge[data-event='NavigationCancel'] {
      background: rgba(186, 126, 38, 0.15);
      border-color: rgba(230, 178, 104, 0.3);
      color: #e6b268;
    }
    .event-badge[data-event='NavigationError'] {
      background: rgba(255, 107, 129, 0.15);
      border-color: rgba(255, 107, 129, 0.3);
      color: #ff6b81;
    }

    .route-badge {
      display: inline-block;
      font-family: monospace;
      font-size: 0.82rem;
      color: var(--text-secondary);
      background: var(--bg-page);
      padding: 3px 8px;
      border-radius: var(--radius-xs);
      border: 1px solid var(--border-subtle);
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active-route {
      color: var(--text-primary);
      border-color: var(--border-medium);
      font-weight: 600;
    }

    .record-meta-note {
      font-size: 0.72rem;
      color: #e6b268;
      margin-top: 4px;
    }
    .record-meta-error {
      font-size: 0.72rem;
      color: #ff6b81;
      margin-top: 4px;
    }

    .id-tag {
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .duration-badge {
      font-family: monospace;
      font-size: 0.82rem;
      font-weight: 600;
      color: #68c49e;
      background: rgba(46, 117, 89, 0.1);
      padding: 3px 8px;
      border-radius: var(--radius-xs);
      border: 1px solid rgba(104, 196, 158, 0.2);
    }
    .duration-empty {
      color: var(--text-muted);
      font-family: monospace;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }
    .status-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .status-pill[data-status='success'] {
      background: rgba(46, 117, 89, 0.15);
      color: #68c49e;
      border: 1px solid rgba(104, 196, 158, 0.3);
    }
    .status-pill[data-status='success'] .status-indicator {
      background: #68c49e;
      box-shadow: 0 0 6px #68c49e;
    }

    .status-pill[data-status='cancelled'] {
      background: rgba(186, 126, 38, 0.15);
      color: #e6b268;
      border: 1px solid rgba(230, 178, 104, 0.3);
    }
    .status-pill[data-status='cancelled'] .status-indicator {
      background: #e6b268;
    }

    .status-pill[data-status='error'] {
      background: rgba(255, 107, 129, 0.15);
      color: #ff6b81;
      border: 1px solid rgba(255, 107, 129, 0.3);
    }
    .status-pill[data-status='error'] .status-indicator {
      background: #ff6b81;
      box-shadow: 0 0 6px #ff6b81;
    }

    .status-pill[data-status='in-progress'] {
      background: rgba(74, 144, 226, 0.15);
      color: #70a1ff;
      border: 1px solid rgba(74, 144, 226, 0.3);
    }
    .status-pill[data-status='in-progress'] .status-indicator {
      background: #70a1ff;
    }

    .status-pill[data-status='skipped'] {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }
    .status-pill[data-status='skipped'] .status-indicator {
      background: var(--text-muted);
    }

    /* EMPTY STATE */
    .empty-state {
      padding: 60px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .empty-icon {
      color: var(--text-muted);
    }
    .empty-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .empty-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      max-width: 440px;
      margin: 0;
    }

    /* FOOTER */
    .dev-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-info {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    .footer-info code, .footer-hint code {
      font-family: monospace;
      color: var(--text-secondary);
      background: var(--bg-surface);
      padding: 2px 6px;
      border-radius: var(--radius-xs);
    }

    @media (max-width: 768px) {
      .dev-header {
        flex-direction: column;
      }
      .header-actions {
        width: 100%;
      }
      .btn-dev {
        flex: 1;
        justify-content: center;
      }
    }
  `]
})
export class DevLogsComponent implements OnInit, OnDestroy {
  private readonly logger = inject(NavigationLoggerService);
  private readonly router = inject(Router);

  private sub?: Subscription;

  public logs = signal<NavigationLogRecord[]>([]);
  public searchQuery = '';
  public selectedFilter = 'all';

  public filteredLogs = computed(() => {
    let list = this.logs();

    if (this.selectedFilter === 'failures') {
      list = list.filter((r) => r.status === 'error' || r.status === 'cancelled');
    } else if (this.selectedFilter !== 'all') {
      list = list.filter((r) => r.event === this.selectedFilter);
    }

    if (!this.searchQuery.trim()) return list;

    const query = this.searchQuery.toLowerCase().trim();
    return list.filter((r) =>
      r.event.toLowerCase().includes(query) ||
      (r.from && r.from.toLowerCase().includes(query)) ||
      (r.to && r.to.toLowerCase().includes(query)) ||
      r.status.toLowerCase().includes(query) ||
      String(r.navigationId).includes(query) ||
      (r.reason && r.reason.toLowerCase().includes(query)) ||
      (r.error && r.error.toLowerCase().includes(query))
    );
  });

  public completedCount = computed(() => {
    return this.logs().filter((r) => r.event === 'NavigationEnd').length;
  });

  public errorCount = computed(() => {
    return this.logs().filter((r) => r.status === 'error' || r.status === 'cancelled').length;
  });

  public avgDuration = computed(() => {
    const completed = this.logs().filter((r) => r.event === 'NavigationEnd' && r.durationMs > 0);
    if (!completed.length) return 0;
    const sum = completed.reduce((acc, curr) => acc + curr.durationMs, 0);
    return Math.round(sum / completed.length);
  });

  ngOnInit(): void {
    // Initial fetch from localStorage
    this.refreshLogs();

    // Subscribe to live updates from the service
    this.sub = this.logger.logs$.subscribe((records) => {
      this.logs.set(records);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refreshLogs(): void {
    const records = this.logger.getLogs();
    this.logs.set(records);
  }

  public clearLogs(): void {
    if (confirm('Clear all stored navigation logs from localStorage?')) {
      this.logger.clearLogs();
      this.logs.set([]);
    }
  }

  public exportJson(): void {
    this.logger.downloadLogsJson();
  }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  public countEvent(eventName: string): number {
    return this.logs().filter((r) => r.event === eventName).length;
  }

  public formatDisplayTime(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
    } catch {
      return isoString;
    }
  }

  public formatDisplayDate(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  }

  public trackByRecord(_index: number, item: NavigationLogRecord): string {
    return `${item.navigationId}-${item.event}-${item.timestamp}`;
  }
}
