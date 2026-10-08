import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventItem } from '../../core/models/event.model';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EventCardComponent],
  template: `
    <div class="events-discovery-page">
      <!-- Discovery Header -->
      <section class="discovery-hero">
        <div class="container">
          <span class="editorial-kicker">Curated Calendar · 2026</span>
          <h1 class="discovery-title">Upcoming Events</h1>
          <p class="discovery-subtext">Find your next night out.</p>

          <!-- Top Search & Quick Bar -->
          <div class="search-sort-bar">
            <div class="search-input-wrap">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search by event, artist, or enclave..."
                class="search-input"
              />
              <button
                *ngIf="searchQuery"
                (click)="searchQuery = ''; applyFilters()"
                class="clear-search-btn"
              >
                &times;
              </button>
            </div>

            <div class="actions-right">
              <!-- Sort Selector -->
              <div class="sort-selector-wrap">
                <span class="sort-label">Sort:</span>
                <select [(ngModel)]="sortBy" (ngModelChange)="applyFilters()" class="sort-select">
                  <option value="date-asc">Date: Upcoming</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <!-- Mobile Filter Drawer Trigger -->
              <button class="btn btn-subtle mobile-filter-btn" (click)="mobileFilterOpen = true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filters
                <span class="filter-count" *ngIf="activeFiltersCount > 0">{{ activeFiltersCount }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Layout (Desktop sidebar + Grid) -->
      <section class="discovery-main container">
        <div class="discovery-layout">
          <!-- Desktop Filter Sidebar -->
          <aside class="desktop-filters card-base">
            <div class="filter-header">
              <span class="filter-heading">Filter Gatherings</span>
              <button class="reset-link" (click)="resetFilters()" *ngIf="activeFiltersCount > 0">
                Clear all
              </button>
            </div>

            <!-- City Filter -->
            <div class="filter-group">
              <label class="filter-label">City</label>
              <div class="chip-list">
                <button
                  *ngFor="let c of cities"
                  class="filter-chip"
                  [class.active]="selectedCity === c"
                  (click)="selectedCity = c; applyFilters()"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- Event Category -->
            <div class="filter-group">
              <label class="filter-label">Experience Type</label>
              <div class="chip-list">
                <button
                  *ngFor="let cat of categories"
                  class="filter-chip"
                  [class.active]="selectedCategory === cat"
                  (click)="selectedCategory = cat; applyFilters()"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Price Range -->
            <div class="filter-group">
              <label class="filter-label">Price Bracket</label>
              <div class="radio-list">
                <label class="radio-option" *ngFor="let p of priceOptions">
                  <input
                    type="radio"
                    name="priceBracket"
                    [value]="p.value"
                    [(ngModel)]="selectedPriceBracket"
                    (ngModelChange)="applyFilters()"
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>

            <!-- Availability -->
            <div class="filter-group">
              <label class="filter-label">Ticket Status</label>
              <div class="chip-list">
                <button
                  *ngFor="let av of availabilities"
                  class="filter-chip"
                  [class.active]="selectedAvailability === av"
                  (click)="selectedAvailability = av; applyFilters()"
                >
                  {{ av }}
                </button>
              </div>
            </div>
          </aside>

          <!-- Events Listing Column -->
          <div class="discovery-results">
            <!-- Active Filter Bar Summary -->
            <div class="results-header">
              <span class="results-count">
                Showing <strong>{{ filteredEvents.length }}</strong> experience{{ filteredEvents.length === 1 ? '' : 's' }}
              </span>

              <div class="active-chips" *ngIf="activeFiltersCount > 0">
                <span class="active-pill" *ngIf="selectedCity !== 'All Cities'">
                  {{ selectedCity }}
                  <span class="remove" (click)="selectedCity = 'All Cities'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedCategory !== 'All Types'">
                  {{ selectedCategory }}
                  <span class="remove" (click)="selectedCategory = 'All Types'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedPriceBracket !== 'all'">
                  Price Filter
                  <span class="remove" (click)="selectedPriceBracket = 'all'; applyFilters()">&times;</span>
                </span>
                <span class="active-pill" *ngIf="selectedAvailability !== 'All'">
                  {{ selectedAvailability }}
                  <span class="remove" (click)="selectedAvailability = 'All'; applyFilters()">&times;</span>
                </span>
              </div>
            </div>

            <!-- Events Grid -->
            <div class="events-grid" *ngIf="filteredEvents.length > 0">
              <div *ngFor="let ev of filteredEvents" class="grid-item">
                <app-event-card [event]="ev"></app-event-card>
              </div>
            </div>

            <!-- Empty State -->
            <div class="empty-state card-base" *ngIf="filteredEvents.length === 0">
              <span class="empty-kicker">No Gatherings Found</span>
              <h3 class="empty-title">Refine Your Atmospheric Query</h3>
              <p class="empty-desc">
                No events currently match your selected filters. Try broadening your criteria or reset filters.
              </p>
              <button class="btn btn-outline" (click)="resetFilters()">
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Mobile Filter Drawer / Bottom Sheet -->
      <div class="mobile-drawer-overlay" *ngIf="mobileFilterOpen" (click)="mobileFilterOpen = false">
        <div class="mobile-filter-sheet glass-panel" (click)="$event.stopPropagation()">
          <div class="drawer-header">
            <h3>Filter Gatherings</h3>
            <button class="close-drawer-btn" (click)="mobileFilterOpen = false">&times;</button>
          </div>

          <div class="drawer-body">
            <!-- City -->
            <div class="filter-group">
              <label class="filter-label">City</label>
              <div class="chip-list">
                <button
                  *ngFor="let c of cities"
                  class="filter-chip"
                  [class.active]="selectedCity === c"
                  (click)="selectedCity = c; applyFilters()"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- Experience Type -->
            <div class="filter-group">
              <label class="filter-label">Experience Type</label>
              <div class="chip-list">
                <button
                  *ngFor="let cat of categories"
                  class="filter-chip"
                  [class.active]="selectedCategory === cat"
                  (click)="selectedCategory = cat; applyFilters()"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Price -->
            <div class="filter-group">
              <label class="filter-label">Price Bracket</label>
              <div class="radio-list">
                <label class="radio-option" *ngFor="let p of priceOptions">
                  <input
                    type="radio"
                    name="mobilePriceBracket"
                    [value]="p.value"
                    [(ngModel)]="selectedPriceBracket"
                    (ngModelChange)="applyFilters()"
                  />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>

            <!-- Availability -->
            <div class="filter-group">
              <label class="filter-label">Availability</label>
              <div class="chip-list">
                <button
                  *ngFor="let av of availabilities"
                  class="filter-chip"
                  [class.active]="selectedAvailability === av"
                  (click)="selectedAvailability = av; applyFilters()"
                >
                  {{ av }}
                </button>
              </div>
            </div>
          </div>

          <div class="drawer-footer">
            <button class="btn btn-outline" (click)="resetFilters()">Clear</button>
            <button class="btn btn-primary" (click)="mobileFilterOpen = false">
              Show {{ filteredEvents.length }} Events
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .discovery-hero {
      padding: 64px 0 32px;
      border-bottom: 1px solid var(--border-subtle);
      background: radial-gradient(circle at 10% 20%, var(--bg-surface-elevated) 0%, transparent 60%);
    }

    .discovery-title {
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      margin-bottom: 8px;
    }

    .discovery-subtext {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }

    .search-sort-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      position: relative;
      flex: 1;
      min-width: 280px;

      .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
      }

      .search-input {
        width: 100%;
        padding: 12px 38px 12px 42px;
        background: var(--bg-input);
        border: 1px solid var(--border-medium);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: var(--accent);
        }
      }

      .clear-search-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        font-size: 1.2rem;
      }
    }

    .actions-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .sort-selector-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);

      .sort-select {
        padding: 10px 14px;
        background: var(--bg-input);
        border: 1px solid var(--border-medium);
        border-radius: var(--radius-sm);
        color: var(--text-primary);
        font-size: 0.85rem;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: var(--accent);
        }
      }
    }

    .mobile-filter-btn {
      display: none;

      @media (max-width: 900px) {
        display: inline-flex;
      }
    }

    .filter-count {
      background: var(--accent);
      color: var(--accent-text);
      font-size: 0.72rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Main Layout */
    .discovery-main {
      padding: 48px 24px 80px;
    }

    .discovery-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 36px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    /* Desktop Sidebar */
    .desktop-filters {
      padding: 24px;
      border-radius: var(--radius-md);
      height: fit-content;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .filter-heading {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .reset-link {
      font-size: 0.76rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .filter-group {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .filter-label {
      display: block;
      font-family: var(--font-display);
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .filter-chip {
      padding: 6px 12px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-size: 0.8rem;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-medium);
        color: var(--text-primary);
      }

      &.active {
        background: var(--accent-subtle);
        border-color: var(--accent);
        color: var(--accent);
        font-weight: 600;
      }
    }

    .radio-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.84rem;
      color: var(--text-secondary);
      cursor: pointer;

      input {
        accent-color: var(--accent);
      }
    }

    /* Results Header */
    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .results-count {
      font-size: 0.88rem;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
      }
    }

    .active-chips {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .active-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-full);
      font-size: 0.74rem;
      color: var(--text-primary);

      .remove {
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        color: var(--accent);
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    /* Empty state */
    .empty-state {
      padding: 64px 32px;
      text-align: center;
      border-radius: var(--radius-md);
    }

    .empty-kicker {
      font-family: var(--font-display);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--accent);
      display: block;
      margin-bottom: 12px;
    }

    .empty-title {
      font-size: 1.6rem;
      margin-bottom: 12px;
    }

    .empty-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 24px;
    }

    /* Mobile Bottom Sheet */
    .mobile-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: flex-end;
    }

    .mobile-filter-sheet {
      width: 100%;
      max-height: 80vh;
      border-radius: 20px 20px 0 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--shadow-drawer);
    }

    .drawer-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 1.2rem;
      }

      .close-drawer-btn {
        font-size: 1.6rem;
        color: var(--text-muted);
      }
    }

    .drawer-body {
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .drawer-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      gap: 12px;
      background: var(--bg-surface);

      .btn {
        flex: 1;
      }
    }
  `]
})
export class EventsComponent implements OnInit {
  private readonly eventService = inject(EventService);
  private readonly route = inject(ActivatedRoute);

  searchQuery = '';
  selectedCity = 'All Cities';
  selectedCategory = 'All Types';
  selectedPriceBracket = 'all';
  selectedAvailability = 'All';
  sortBy = 'date-asc';

  mobileFilterOpen = false;

  readonly cities = ['All Cities', 'Bengaluru', 'Mumbai', 'Goa', 'Delhi'];
  readonly categories = [
    'All Types',
    'House Party',
    'Rooftop Sessions',
    'Intimate DJ',
    'Private Gathering',
    'Pop-up Experience'
  ];
  readonly priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹750', value: 'under-750' },
    { label: '₹750 – ₹1,200', value: '750-1200' },
    { label: 'Above ₹1,200', value: 'above-1200' }
  ];
  readonly availabilities = ['All', 'Available', 'Selling Fast', 'Limited Spots'];

  filteredEvents: EventItem[] = [];

  get activeFiltersCount(): number {
    let count = 0;
    if (this.selectedCity !== 'All Cities') count++;
    if (this.selectedCategory !== 'All Types') count++;
    if (this.selectedPriceBracket !== 'all') count++;
    if (this.selectedAvailability !== 'All') count++;
    if (this.searchQuery.trim().length > 0) count++;
    return count;
  }

  ngOnInit(): void {
    // Check query params (e.g. from footer links)
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['city']) {
        this.selectedCity = params['city'];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let list = [...this.eventService.events()];

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.edition.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.lineup.some(artist => artist.name.toLowerCase().includes(q))
      );
    }

    // City
    if (this.selectedCity !== 'All Cities') {
      list = list.filter(e => e.city.toLowerCase() === this.selectedCity.toLowerCase());
    }

    // Category
    if (this.selectedCategory !== 'All Types') {
      list = list.filter(e => e.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Price
    if (this.selectedPriceBracket === 'under-750') {
      list = list.filter(e => e.startingPrice < 750);
    } else if (this.selectedPriceBracket === '750-1200') {
      list = list.filter(e => e.startingPrice >= 750 && e.startingPrice <= 1200);
    } else if (this.selectedPriceBracket === 'above-1200') {
      list = list.filter(e => e.startingPrice > 1200);
    }

    // Availability
    if (this.selectedAvailability !== 'All') {
      list = list.filter(e => e.availability.toLowerCase() === this.selectedAvailability.toLowerCase());
    }

    // Sorting
    if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (this.sortBy === 'popular') {
      list.sort((a, b) => b.ticketsSold - a.ticketsSold);
    } else {
      // date-asc
      list.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
    }

    this.filteredEvents = list;
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCity = 'All Cities';
    this.selectedCategory = 'All Types';
    this.selectedPriceBracket = 'all';
    this.selectedAvailability = 'All';
    this.sortBy = 'date-asc';
    this.applyFilters();
  }
}
