import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, CheckoutSession } from '../../core/services/event.service';
import { EventItem, TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="event-detail-page" *ngIf="event">
      <!-- 1. EDITORIAL HERO -->
      <section class="detail-hero">
        <div class="detail-hero-media">
          <img [src]="event.heroImage" [alt]="event.title" class="detail-bg-img" />
          <div class="hero-curtain"></div>
        </div>

        <div class="container detail-hero-content">
          <div class="breadcrumb-row">
            <a routerLink="/events" class="back-link">
              &larr; Return to Calendar
            </a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ event.city }}</span>
          </div>

          <div class="hero-kicker-meta">
            <span class="category-capsule">{{ event.category }}</span>
            <span
              class="status-pill"
              [ngClass]="'status-' + event.availability.toLowerCase().replace(' ', '-')"
            >
              {{ event.availability }}
            </span>
          </div>

          <h1 class="event-main-title">
            {{ event.title }}
            <span class="event-edition-tag">{{ event.edition }}</span>
          </h1>

          <div class="hero-date-location">
            <div class="meta-unit">
              <span class="meta-label">Date & Time</span>
              <span class="meta-value">{{ event.date }} · {{ event.time }}</span>
            </div>
            <div class="meta-unit">
              <span class="meta-label">Location</span>
              <span class="meta-value">{{ event.venue }}, {{ event.city }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. MAIN SPLIT LAYOUT (Editorial Content + Sticky Booking Panel) -->
      <div class="container detail-body-layout">
        <!-- Left: Editorial Story, Highlights, Lineup, Rules -->
        <main class="story-column">
          <!-- Quick Metadata Bar -->
          <div class="quick-meta-bar card-base">
            <div class="meta-cell">
              <span class="cell-label">Age Protocol</span>
              <span class="cell-val">{{ event.ageLimit }} Photo ID</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Dress Code</span>
              <span class="cell-val">{{ event.dressCode }}</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Curated Capacity</span>
              <span class="cell-val">{{ event.capacity }} Guests Max</span>
            </div>
            <div class="meta-cell">
              <span class="cell-label">Doors Open</span>
              <span class="cell-val">{{ event.doorsOpen }}</span>
            </div>
          </div>

          <!-- Description Section -->
          <section class="editorial-section">
            <span class="editorial-kicker">Atmosphere & Narrative</span>
            <h2 class="sub-heading">About This Gathering</h2>
            <p class="story-paragraph">{{ event.description }}</p>
          </section>

          <!-- Highlights Section -->
          <section class="editorial-section">
            <span class="editorial-kicker">Experience Inclusions</span>
            <h2 class="sub-heading">Event Highlights</h2>
            <div class="highlights-grid">
              <div class="highlight-card card-base" *ngFor="let h of event.highlights">
                <span class="highlight-dot"></span>
                <span class="highlight-text">{{ h }}</span>
              </div>
            </div>
          </section>

          <!-- Artist Lineup Section -->
          <section class="editorial-section" *ngIf="event.lineup.length > 0">
            <span class="editorial-kicker">Selectors & Sets</span>
            <h2 class="sub-heading">Sound Curation</h2>
            <div class="lineup-table card-base">
              <div class="lineup-row" *ngFor="let item of event.lineup">
                <div class="artist-col">
                  <span class="artist-name">{{ item.name }}</span>
                  <span class="artist-role">{{ item.role }}</span>
                </div>
                <div class="time-col">
                  <span class="set-time">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Venue & Secrecy Policy -->
          <section class="editorial-section">
            <span class="editorial-kicker">Location Sanctuary</span>
            <h2 class="sub-heading">The Venue</h2>
            <div class="venue-card card-base">
              <div class="venue-details">
                <h4 class="venue-name">{{ event.venue }}</h4>
                <p class="venue-address">{{ event.address }}</p>
                <div class="venue-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <span>Exact gate entry coordinates & host check-in instructions are delivered to your ticket pass 6 hours prior to door opening.</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Gathering Etiquette / Rules -->
          <section class="editorial-section">
            <span class="editorial-kicker">Sanctuary Rules</span>
            <h2 class="sub-heading">House Etiquette</h2>
            <ul class="rules-list">
              <li *ngFor="let rule of event.rules">{{ rule }}</li>
            </ul>
          </section>
        </main>

        <!-- Right: Sticky Ticket Booking Panel -->
        <aside class="booking-column">
          <div class="sticky-booking-panel card-base glass-panel">
            <div class="panel-header">
              <span class="editorial-kicker">Reserve Admission</span>
              <h3 class="panel-title">Select Access Pass</h3>
              <p class="panel-desc">Tickets are limited and verified upon entry.</p>
            </div>

            <!-- Ticket Tiers Radio Selector -->
            <div class="tiers-selector">
              <div
                *ngFor="let tier of event.ticketTiers"
                class="tier-option"
                [class.selected]="selectedTier?.id === tier.id"
                [class.sold-out]="tier.availableQuantity === 0"
                (click)="selectTier(tier)"
              >
                <div class="tier-top-row">
                  <div class="tier-name-badge">
                    <span class="radio-indicator"></span>
                    <span class="tier-title">{{ tier.name }}</span>
                  </div>
                  <span class="tier-price">₹{{ tier.price }}</span>
                </div>

                <p class="tier-desc">{{ tier.description }}</p>

                <div class="tier-bottom-row">
                  <span class="tier-badge" *ngIf="tier.badge">{{ tier.badge }}</span>
                  <span class="tier-availability" *ngIf="tier.availableQuantity > 0">
                    {{ tier.availableQuantity }} remaining
                  </span>
                  <span class="tier-soldout-label" *ngIf="tier.availableQuantity === 0">
                    Sold Out
                  </span>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="quantity-row" *ngIf="selectedTier && selectedTier.availableQuantity > 0">
              <span class="qty-label">Quantity (Passes)</span>
              <div class="qty-stepper">
                <button
                  type="button"
                  class="stepper-btn"
                  (click)="decreaseQty()"
                  [disabled]="ticketQuantity <= 1"
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span class="qty-value">{{ ticketQuantity }}</span>
                <button
                  type="button"
                  class="stepper-btn"
                  (click)="increaseQty()"
                  [disabled]="ticketQuantity >= maxAllowedQty"
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>
            </div>

            <!-- Subtotal & Price Summary -->
            <div class="price-breakdown" *ngIf="selectedTier">
              <div class="breakdown-row">
                <span>Pass (₹{{ selectedTier.price }} &times; {{ ticketQuantity }})</span>
                <span>₹{{ subtotal }}</span>
              </div>
              <div class="breakdown-row">
                <span>Guest Convenience Fee (5%)</span>
                <span>₹{{ convenienceFee }}</span>
              </div>
              <div class="breakdown-total">
                <span>Total Amount</span>
                <span class="total-number">₹{{ totalAmount }}</span>
              </div>
            </div>

            <!-- Booking CTA -->
            <div class="booking-cta-wrap">
              <button
                class="btn btn-primary btn-lg w-full"
                [disabled]="!selectedTier || selectedTier.availableQuantity === 0"
                (click)="proceedToRegistration()"
              >
                Continue to Guest Details &rarr;
              </button>
            </div>

            <!-- Security Assurance Microcopy -->
            <div class="booking-footer-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Instant digital pass · Encrypted QR validation</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .detail-hero {
      position: relative;
      min-height: 480px;
      display: flex;
      align-items: flex-end;
      padding-bottom: 48px;
      overflow: hidden;

      @media (max-width: 768px) {
        min-height: 380px;
        padding-bottom: 32px;
      }
    }

    .detail-hero-media {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .detail-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.35) saturate(0.9);
    }

    .hero-curtain {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(11, 12, 14, 0.2) 0%,
        rgba(11, 12, 14, 0.7) 60%,
        var(--bg-page) 100%
      );
    }

    .detail-hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
    }

    .breadcrumb-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.82rem;
      margin-bottom: 20px;
      color: var(--text-muted);
    }

    .back-link {
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .hero-kicker-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .category-capsule {
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-sm);
      color: #ffffff;
    }

    .event-main-title {
      font-size: clamp(2.4rem, 5.5vw, 4.4rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
      line-height: 1.05;

      .event-edition-tag {
        display: block;
        font-size: clamp(1rem, 2vw, 1.4rem);
        letter-spacing: 0.12em;
        color: var(--text-secondary);
        margin-top: 4px;
      }
    }

    .hero-date-location {
      display: flex;
      gap: 36px;
      flex-wrap: wrap;
    }

    .meta-unit {
      display: flex;
      flex-direction: column;

      .meta-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .meta-value {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--text-primary);
      }
    }

    /* Split layout */
    .detail-body-layout {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 48px;
      padding-top: 40px;
      padding-bottom: 80px;

      @media (max-width: 980px) {
        grid-template-columns: 1fr;
      }
    }

    .quick-meta-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 18px 24px;
      border-radius: var(--radius-md);
      margin-bottom: 48px;
      gap: 16px;

      @media (max-width: 680px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .meta-cell {
      display: flex;
      flex-direction: column;

      .cell-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin-bottom: 2px;
      }

      .cell-val {
        font-family: var(--font-display);
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }

    .editorial-section {
      margin-bottom: 48px;
    }

    .sub-heading {
      font-size: 1.6rem;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }

    .story-paragraph {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .highlight-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: var(--radius-sm);
    }

    .highlight-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
    }

    .highlight-text {
      font-size: 0.9rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    /* Lineup table */
    .lineup-table {
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .lineup-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child {
        border-bottom: none;
      }
    }

    .artist-col {
      display: flex;
      flex-direction: column;

      .artist-name {
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 700;
      }

      .artist-role {
        font-size: 0.8rem;
        color: var(--text-secondary);
      }
    }

    .time-col {
      .set-time {
        font-size: 0.82rem;
        color: var(--text-muted);
        font-weight: 600;
      }
    }

    /* Venue */
    .venue-card {
      padding: 24px;
      border-radius: var(--radius-md);
    }

    .venue-name {
      font-size: 1.2rem;
      margin-bottom: 4px;
    }

    .venue-address {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .venue-note {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
      padding: 12px 16px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);

      svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent);
      }
    }

    /* Rules list */
    .rules-list {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.5;
      }
    }

    /* Sticky Booking Column */
    .booking-column {
      position: relative;
    }

    .sticky-booking-panel {
      position: sticky;
      top: 96px;
      padding: 28px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-elevated);
    }

    .panel-title {
      font-size: 1.35rem;
      margin-bottom: 4px;
    }

    .panel-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .tiers-selector {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .tier-option {
      padding: 16px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover:not(.sold-out) {
        border-color: var(--border-strong);
      }

      &.selected {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .radio-indicator {
          border-color: var(--accent);
          background: var(--accent);
        }
      }

      &.sold-out {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .tier-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .tier-name-badge {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .radio-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid var(--border-medium);
      display: inline-block;
      transition: all var(--transition-fast);
    }

    .tier-title {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
    }

    .tier-price {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
    }

    .tier-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .tier-bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.74rem;
    }

    .tier-badge {
      color: var(--accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .tier-availability {
      color: var(--text-muted);
    }

    .tier-soldout-label {
      color: var(--badge-error-text);
      font-weight: 700;
    }

    .quantity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 20px;
    }

    .qty-label {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .qty-stepper {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-input);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      padding: 4px;
    }

    .stepper-btn {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: var(--text-primary);
      border-radius: var(--radius-xs);

      &:hover:not(:disabled) {
        background: var(--bg-surface-elevated);
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .qty-value {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      min-width: 24px;
      text-align: center;
    }

    .price-breakdown {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .breakdown-row {
      display: flex;
      justify-content: space-between;
    }

    .breakdown-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-weight: 700;

      .total-number {
        font-family: var(--font-display);
        font-size: 1.3rem;
        color: var(--text-primary);
      }
    }

    .booking-cta-wrap {
      margin-bottom: 16px;
    }

    .w-full {
      width: 100%;
    }

    .booking-footer-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `]
})
export class EventDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  event?: EventItem;
  selectedTier?: TicketTier;
  ticketQuantity = 1;
  readonly maxAllowedQty = 6;

  get subtotal(): number {
    if (!this.selectedTier) return 0;
    return this.selectedTier.price * this.ticketQuantity;
  }

  get convenienceFee(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get totalAmount(): number {
    return this.subtotal + this.convenienceFee;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.event = this.eventService.getEventById(id);
        if (this.event && this.event.ticketTiers.length > 0) {
          // Select first available tier
          const available = this.event.ticketTiers.find(t => t.availableQuantity > 0);
          this.selectedTier = available || this.event.ticketTiers[0];
        }
      }
    });
  }

  selectTier(tier: TicketTier): void {
    if (tier.availableQuantity === 0) return;
    this.selectedTier = tier;
  }

  increaseQty(): void {
    if (!this.selectedTier) return;
    const limit = Math.min(this.selectedTier.availableQuantity, this.maxAllowedQty);
    if (this.ticketQuantity < limit) {
      this.ticketQuantity++;
    }
  }

  decreaseQty(): void {
    if (this.ticketQuantity > 1) {
      this.ticketQuantity--;
    }
  }

  proceedToRegistration(): void {
    if (!this.event || !this.selectedTier) return;

    const session: CheckoutSession = {
      event: this.event,
      tier: this.selectedTier,
      quantity: this.ticketQuantity,
      attendee: {
        fullName: '',
        email: '',
        phone: ''
      },
      additionalGuests: [],
      subtotal: this.subtotal,
      convenienceFee: this.convenienceFee,
      total: this.totalAmount
    };

    this.eventService.setCheckoutSession(session);
    this.router.navigate(['/events', this.event.id, 'register']);
  }
}
