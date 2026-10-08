import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { EventCategory } from '../../core/models/category.model';
import { EventItem } from '../../core/models/event.model';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';

@Component({
  selector: 'app-category-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EventCardComponent],
  template: `
    <div class="category-page" *ngIf="category; else notFoundTemplate">
      <!-- 1. CATEGORY HERO / BANNER HEADER -->
      <section class="category-hero">
        <div class="hero-bg-container">
          <img
            [src]="category.bannerImage"
            [alt]="category.name"
            class="hero-bg-image"
          />
          <div class="hero-backdrop"></div>
        </div>

        <div class="container hero-content-wrapper">
          <!-- Breadcrumb Navigation -->
          <nav class="breadcrumb-row" aria-label="Breadcrumb">
            <a routerLink="/" class="crumb-link">Home</a>
            <span class="crumb-sep">/</span>
            <a routerLink="/events" class="crumb-link">Events</a>
            <span class="crumb-sep">/</span>
            <span class="crumb-current">{{ category.name }}</span>
          </nav>

          <div class="hero-grid">
            <!-- Left Info Column -->
            <div class="hero-text-col">
              <div class="category-badge-row">
                <span class="editorial-kicker">SPOTBUKK CURATION</span>
                <span class="featured-pill" *ngIf="category.featured">Top 5 Experience</span>
              </div>

              <h1 class="category-title">{{ category.name }}</h1>
              <p class="category-tagline">"{{ category.tagline }}"</p>
              <p class="category-description">{{ category.description }}</p>

              <div class="hero-metrics-bar glass-panel">
                <div class="metric-item">
                  <span class="metric-val">0{{ events.length }}</span>
                  <span class="metric-lbl">Curated Events</span>
                </div>
                <div class="metric-divider"></div>
                <div class="metric-item">
                  <span class="metric-val">100%</span>
                  <span class="metric-lbl">Vetted Entry</span>
                </div>
                <div class="metric-divider"></div>
                <div class="metric-item">
                  <span class="metric-val">Bengaluru</span>
                  <span class="metric-lbl">Host City</span>
                </div>
              </div>
            </div>

            <!-- Right Visual Banner Card (Showcasing Official Artwork) -->
            <div class="hero-banner-col">
              <div class="banner-showcase-frame card-base">
                <img
                  [src]="category.bannerImage"
                  [alt]="category.name + ' Official Artwork'"
                  class="showcase-banner-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. EVENTS LISTING SECTION -->
      <section class="section events-section">
        <div class="container">
          <div class="section-toolbar">
            <div class="toolbar-left">
              <h2 class="events-heading">
                Upcoming {{ category.name }} Events
              </h2>
              <p class="events-subheading">
                Showing {{ filteredEvents.length }} experience{{ filteredEvents.length === 1 ? '' : 's' }}
              </p>
            </div>

            <!-- Search & Sort Filter -->
            <div class="toolbar-right">
              <div class="filter-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="applyLocalFilters()"
                  placeholder="Filter this category..."
                  class="filter-input"
                />
                <button
                  *ngIf="searchQuery"
                  (click)="searchQuery = ''; applyLocalFilters()"
                  class="clear-btn"
                >
                  &times;
                </button>
              </div>

              <select
                [(ngModel)]="sortBy"
                (ngModelChange)="applyLocalFilters()"
                class="sort-select"
              >
                <option value="date-asc">Date: Upcoming</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <!-- Event Cards Grid (Reusing Existing app-event-card) -->
          <div class="events-grid" *ngIf="filteredEvents.length > 0; else noEventsFound">
            <div *ngFor="let ev of filteredEvents" class="event-card-cell">
              <app-event-card [event]="ev"></app-event-card>
            </div>
          </div>

          <!-- Empty State -->
          <ng-template #noEventsFound>
            <div class="empty-state card-base text-center">
              <p class="empty-title">No events match "{{ searchQuery }}"</p>
              <p class="empty-desc">Try clearing your search query to see all upcoming {{ category.name }} events.</p>
              <button class="btn btn-primary" (click)="searchQuery = ''; applyLocalFilters()">
                Clear Filter
              </button>
            </div>
          </ng-template>
        </div>
      </section>

      <!-- 3. EXPLORE MORE CATEGORIES -->
      <section class="section other-categories-section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="editorial-kicker">DISCOVER MORE</span>
              <h2 class="section-title">Explore Other Experiences</h2>
            </div>
            <a routerLink="/events" class="view-link">
              Browse All Gatherings &rarr;
            </a>
          </div>

          <div class="other-categories-scroll">
            <a
              *ngFor="let other of otherCategories"
              [routerLink]="['/events/category', other.slug]"
              class="other-cat-pill card-base"
            >
              <img [src]="other.bannerImage" [alt]="other.name" class="pill-thumb" />
              <div class="pill-meta">
                <span class="pill-title">{{ other.name }}</span>
                <span class="pill-tagline">{{ other.tagline }}</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- 404 NOT FOUND TEMPLATE -->
    <ng-template #notFoundTemplate>
      <div class="not-found-page container text-center">
        <span class="editorial-kicker">Category Not Found</span>
        <h1 class="not-found-title">Experience Category Not Found</h1>
        <p class="not-found-text">
          The category you are looking for does not exist or may have been moved.
        </p>
        <div class="not-found-cta">
          <a routerLink="/" class="btn btn-primary">Return Home</a>
          <a routerLink="/events" class="btn btn-outline">Browse All Events</a>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .category-page {
      min-height: 100vh;
      background: var(--bg-page);
    }

    /* Hero Section */
    .category-hero {
      position: relative;
      padding: 40px 0 60px;
      overflow: hidden;
      border-bottom: 1px solid var(--border-subtle);
    }

    .hero-bg-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .hero-bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(40px) brightness(0.25);
      transform: scale(1.15);
    }

    .hero-backdrop {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(11, 12, 14, 0.75) 0%,
        var(--bg-page) 100%
      );
    }

    .hero-content-wrapper {
      position: relative;
      z-index: 2;
    }

    /* Breadcrumbs */
    .breadcrumb-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 24px;
    }

    .crumb-link {
      color: var(--text-secondary);
      transition: color var(--transition-fast);

      &:hover {
        color: var(--text-primary);
      }
    }

    .crumb-sep {
      color: var(--border-medium);
    }

    .crumb-current {
      color: var(--text-primary);
      font-weight: 600;
    }

    /* Hero Grid Layout */
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    .category-badge-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .featured-pill {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 3px 10px;
      background: var(--accent);
      color: #ffffff;
      border-radius: var(--radius-xs);
    }

    .category-title {
      font-size: clamp(2.2rem, 5vw, 3.6rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .category-tagline {
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      font-style: italic;
      color: var(--accent-text, #ffffff);
      opacity: 0.95;
      margin-bottom: 16px;
      font-family: var(--font-display);
    }

    .category-description {
      font-size: 0.98rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 28px;
      max-width: 620px;
    }

    /* Metrics Bar */
    .hero-metrics-bar {
      display: inline-flex;
      align-items: center;
      gap: 24px;
      padding: 14px 24px;
      border-radius: var(--radius-md);

      @media (max-width: 600px) {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
      }
    }

    .metric-item {
      display: flex;
      flex-direction: column;
    }

    .metric-val {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .metric-lbl {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .metric-divider {
      width: 1px;
      height: 28px;
      background: var(--border-medium);
    }

    /* Right Showcase Banner */
    .hero-banner-col {
      display: flex;
      justify-content: center;
    }

    .banner-showcase-frame {
      max-width: 440px;
      width: 100%;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-medium);
      box-shadow: var(--shadow-drawer);
      transition: transform var(--transition-normal);

      &:hover {
        transform: scale(1.02);
      }
    }

    .showcase-banner-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    /* Events Section */
    .events-section {
      padding: 56px 0;
    }

    .section-toolbar {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .events-heading {
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .events-subheading {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-input-wrap {
      position: relative;
      display: flex;
      align-items: center;

      svg {
        position: absolute;
        left: 14px;
        color: var(--text-muted);
        pointer-events: none;
      }
    }

    .filter-input {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);
      padding: 10px 36px 10px 40px;
      font-size: 0.88rem;
      border-radius: var(--radius-sm);
      width: 220px;
      transition: border-color var(--transition-fast);

      &:focus {
        outline: none;
        border-color: var(--accent);
      }

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    .clear-btn {
      position: absolute;
      right: 12px;
      font-size: 1.1rem;
      color: var(--text-muted);
      cursor: pointer;

      &:hover {
        color: var(--text-primary);
      }
    }

    .sort-select {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);
      padding: 10px 14px;
      font-size: 0.88rem;
      border-radius: var(--radius-sm);
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: var(--accent);
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    .event-card-cell {
      display: flex;
    }

    /* Empty state */
    .empty-state {
      padding: 48px 24px;
      margin: 24px 0;
    }

    .empty-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .empty-desc {
      font-size: 0.92rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    /* Other Categories */
    .other-categories-section {
      padding: 48px 0 64px;
      border-top: 1px solid var(--border-subtle);
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 16px;
    }

    .section-title {
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-top: 4px;
    }

    .view-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--accent);
      transition: transform var(--transition-fast);

      &:hover {
        text-decoration: underline;
      }
    }

    .other-categories-scroll {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .other-cat-pill {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 14px;
      text-decoration: none;
      color: inherit;
      transition: all var(--transition-fast);

      &:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
      }
    }

    .pill-thumb {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      flex-shrink: 0;
    }

    .pill-meta {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .pill-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pill-tagline {
      font-size: 0.76rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Not Found */
    .not-found-page {
      padding: 120px 24px;
    }

    .not-found-title {
      font-size: 2.4rem;
      margin: 12px 0 16px;
    }

    .not-found-text {
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 32px;
    }

    .not-found-cta {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  `]
})
export class CategoryEventsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);

  category?: EventCategory;
  events: EventItem[] = [];
  filteredEvents: EventItem[] = [];
  otherCategories: EventCategory[] = [];

  searchQuery = '';
  sortBy = 'date-asc';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadCategoryData(slug);
      }
    });
  }

  private loadCategoryData(slug: string): void {
    this.category = this.categoryService.getCategoryBySlug(slug);
    if (this.category) {
      this.events = this.categoryService.getEventsByCategory(this.category.slug);
      this.otherCategories = this.categoryService
        .allCategories()
        .filter(c => c.slug !== this.category?.slug);
      this.searchQuery = '';
      this.applyLocalFilters();
      // Scroll to top upon navigation
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  applyLocalFilters(): void {
    let list = [...this.events];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.subtitle.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    if (this.sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else {
      list.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
    }

    this.filteredEvents = list;
  }
}
