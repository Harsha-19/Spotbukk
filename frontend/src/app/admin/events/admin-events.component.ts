import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventItem } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="events-admin-page">
      <div class="page-header">
        <div>
          <span class="editorial-kicker">Curated Inventory</span>
          <h1 class="page-title">Events & Calendar</h1>
          <p class="page-sub">Manage gathering listings, ticket tiers, capacities, and publishing states.</p>
        </div>

        <div class="header-actions">
          <a routerLink="/admin/events/create" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Gathering
          </a>
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div class="admin-toolbar card-base">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Search by event title, venue, or city..."
            class="form-control"
          />
        </div>

        <div class="status-tabs">
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'all'"
            (click)="selectedStatus = 'all'"
          >
            All ({{ eventService.events().length }})
          </button>
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'published'"
            (click)="selectedStatus = 'published'"
          >
            Published
          </button>
          <button
            class="filter-tab"
            [class.active]="selectedStatus === 'draft'"
            (click)="selectedStatus = 'draft'"
          >
            Drafts
          </button>
        </div>
      </div>

      <!-- Events Table -->
      <div class="table-card card-base">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Gathering</th>
                <th>Schedule</th>
                <th>Venue & City</th>
                <th>Admission Pricing</th>
                <th>Capacity Sold</th>
                <th>Status</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ev of filteredEvents">
                <td>
                  <div class="event-meta-cell">
                    <img [src]="ev.heroImage" [alt]="ev.title" class="table-thumb" />
                    <div>
                      <span class="cell-title">{{ ev.title }}</span>
                      <span class="cell-edition">{{ ev.edition }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.date }}</span>
                  <span class="cell-secondary">{{ ev.time }}</span>
                </td>
                <td>
                  <span class="cell-primary">{{ ev.venue }}</span>
                  <span class="cell-secondary">{{ ev.city }}</span>
                </td>
                <td>
                  <span class="cell-primary">From ₹{{ ev.startingPrice }}</span>
                  <span class="cell-secondary">{{ ev.ticketTiers.length }} Tiers</span>
                </td>
                <td>
                  <div class="cap-meter">
                    <div class="bar-track">
                      <div
                        class="bar-fill"
                        [style.width.%]="(ev.ticketsSold / ev.capacity) * 100"
                      ></div>
                    </div>
                    <span class="cap-label">{{ ev.ticketsSold }} / {{ ev.capacity }}</span>
                  </div>
                </td>
                <td>
                  <button
                    class="status-pill status-btn"
                    [ngClass]="'status-' + ev.status"
                    (click)="togglePublish(ev.id)"
                    title="Click to toggle publish status"
                  >
                    {{ ev.status }}
                  </button>
                </td>
                <td class="text-right">
                  <div class="actions-dropdown">
                    <a [routerLink]="['/events', ev.id]" target="_blank" class="action-btn" title="View Public Page">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </a>
                    <button class="action-btn" (click)="duplicateEvent(ev.id)" title="Duplicate Gathering">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button>
                    <button class="action-btn action-delete" (click)="deleteEvent(ev.id)" title="Delete Gathering">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-admin-page {
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

    .admin-toolbar {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-box {
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
        padding: 16px 18px;
        border-bottom: 1px solid var(--border-subtle);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .text-right {
      text-align: right;
    }

    .event-meta-cell {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .table-thumb {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      flex-shrink: 0;
    }

    .cell-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-primary);
      display: block;
    }

    .cell-edition {
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      color: var(--accent);
      font-weight: 600;
      display: block;
    }

    .cell-primary {
      font-weight: 600;
      color: var(--text-primary);
      display: block;
    }

    .cell-secondary {
      font-size: 0.76rem;
      color: var(--text-muted);
      display: block;
    }

    .cap-meter {
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

    .cap-label {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .status-btn {
      cursor: pointer;
    }

    .actions-dropdown {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface-subtle);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
        color: var(--text-primary);
      }

      &.action-delete:hover {
        border-color: var(--badge-error-text);
        color: var(--badge-error-text);
      }
    }
  `]
})
export class AdminEventsComponent {
  readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  searchQuery = '';
  selectedStatus: 'all' | 'published' | 'draft' = 'all';

  get filteredEvents(): EventItem[] {
    let list = this.eventService.events();
    if (this.selectedStatus !== 'all') {
      list = list.filter(e => e.status === this.selectedStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      );
    }
    return list;
  }

  togglePublish(id: string): void {
    this.eventService.togglePublishStatus(id);
    this.toast.info('Status Updated', 'Gathering publishing state toggled.');
  }

  duplicateEvent(id: string): void {
    const copy = this.eventService.duplicateEvent(id);
    if (copy) {
      this.toast.success('Gathering Duplicated', `${copy.title} added as draft.`);
    }
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you wish to remove this gathering?')) {
      this.eventService.deleteEvent(id);
      this.toast.info('Gathering Removed', 'Event removed from calendar.');
    }
  }
}
