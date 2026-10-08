import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import { FeaturedSliderComponent } from './featured-slider/featured-slider.component';
import { ExploreExperiencesComponent } from './explore-experiences/explore-experiences.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EventCardComponent,
    FeaturedSliderComponent,
    ExploreExperiencesComponent
  ],
  template: `
    <div class="home-page">
      <!-- 1. HERO SECTION -->
      <section class="hero-section">
        <div class="hero-background-wrapper">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80"
            alt="Atmospheric SpotBukk Gathering"
            class="hero-bg-img"
          />
          <div class="hero-gradient-overlay"></div>
        </div>

        <div class="container hero-content">
          <div class="hero-kicker-row">
            <span class="editorial-kicker">CURATED NIGHTLIFE & PRIVATE SESSIONS</span>
            <span class="live-pill">
              <span class="pulse-indicator"></span>
              Autumn/Winter 2026 Season Active
            </span>
          </div>

          <h1 class="hero-headline">
            MAKE TONIGHT<br />
            WORTH REMEMBERING.
          </h1>

          <p class="hero-subtext">
            Curated house parties, music nights and unforgettable experiences across Bengaluru, Mumbai, Goa, and Delhi.
          </p>

          <div class="hero-cta-group">
            <a routerLink="/events" class="btn btn-primary btn-lg">
              Explore Events
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/admin/events/create" class="btn btn-outline btn-lg">
              Host an Event
            </a>
          </div>

          <!-- Quick Enclave Counter -->
          <div class="hero-stats-bar glass-panel">
            <div class="stat-item">
              <span class="stat-number">06</span>
              <span class="stat-desc">Curated Gatherings</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">180</span>
              <span class="stat-desc">Cap Per Event</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-desc">Vetted Entry</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">04</span>
              <span class="stat-desc">Cities</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. FEATURED EVENT BANNER (Editorial Master Showcase) -->
      <section class="section featured-section" *ngIf="featuredEvent as feat">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="editorial-kicker">Spotlight Gathering</span>
              <h2 class="section-title">The Signature Edition</h2>
            </div>
            <a [routerLink]="['/events', feat.id]" class="view-link">
              View Event Story &rarr;
            </a>
          </div>

          <div class="featured-editorial-card card-base">
            <div class="featured-image-col">
              <img [src]="feat.heroImage" [alt]="feat.title" class="featured-img" />
              <div class="featured-badge-pill">
                <span class="status-pill status-selling-fast">Selling Fast</span>
              </div>
            </div>

            <div class="featured-info-col">
              <div class="feat-top-meta">
                <span class="feat-category">{{ feat.category }}</span>
                <span class="feat-date">{{ feat.date }}</span>
              </div>

              <h2 class="feat-title">
                {{ feat.title }}
                <span class="feat-edition">{{ feat.edition }}</span>
              </h2>

              <p class="feat-desc">
                {{ feat.description }}
              </p>

              <div class="feat-highlights-grid">
                <div class="highlight-item" *ngFor="let h of feat.highlights.slice(0, 3)">
                  <span class="highlight-check">✓</span>
                  <span>{{ h }}</span>
                </div>
              </div>

              <div class="feat-action-row">
                <div class="feat-price">
                  <span class="label">Tickets From</span>
                  <span class="val">₹{{ feat.startingPrice }}</span>
                </div>
                <div class="feat-btns">
                  <a [routerLink]="['/events', feat.id]" class="btn btn-primary">
                    View Event & Reserve
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <!-- NEW: TOP 5 EXPERIENCES SLIDER -->
      <app-featured-slider></app-featured-slider>

      <!-- NEW: EXPLORE EXPERIENCES (12 CATEGORIES) -->
      <app-explore-experiences></app-explore-experiences>

      <!-- 3. UPCOMING EVENTS GRID -->
      <section class="section events-section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="editorial-kicker">Current Calendar</span>
              <h2 class="section-title">Upcoming Gatherings</h2>
            </div>
            <a routerLink="/events" class="view-link">
              Browse All Experiences &rarr;
            </a>
          </div>

          <div class="events-grid">
            <div *ngFor="let ev of upcomingEvents" class="event-grid-col">
              <app-event-card [event]="ev"></app-event-card>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. EXPERIENCE SECTION (Editorial Brand Essence) -->
      <section class="section experience-section" id="experience">
        <div class="container">
          <div class="experience-header text-center">
            <span class="editorial-kicker">The SpotBukk Philosophy</span>
            <h2 class="experience-main-title">
              NOT JUST A PARTY.<br />
              AN EXPERIENCE.
            </h2>
            <p class="experience-lead">
              We reimagined nightlife for those fatigued by sterile commercial venues, chaotic overcrowding, and generic party templates.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-card card-base">
              <div class="feature-number">01</div>
              <h3 class="feature-title">Curated Spaces</h3>
              <p class="feature-text">
                Every gathering is hosted in architecturally distinct residences: penthouse conservatories, cliffside estates, restored industrial vaults, and secluded open-air gardens.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">02</div>
              <h3 class="feature-title">Music & Atmosphere</h3>
              <p class="feature-text">
                Analog warmth, vinyl-only warmups, and deep underground selections tuned to bespoke acoustic setups. Warm incandescent lighting, never harsh strobe clutter.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">03</div>
              <h3 class="feature-title">Limited Capacity</h3>
              <p class="feature-text">
                Guestlists are strictly hard-capped (80–220 guests max). No elbow-to-elbow crush at the bar, no thirty-minute bathroom lines, no anonymous crowds.
              </p>
            </div>

            <div class="feature-card card-base">
              <div class="feature-number">04</div>
              <h3 class="feature-title">Easy Digital Entry</h3>
              <p class="feature-text">
                Frictionless digital pass with animated security signature and QR barcode. One-second door verification with our mobile host check-in engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FAQ SECTION -->
      <section class="section faq-section" id="faq">
        <div class="container container-narrow">
          <div class="text-center mb-48">
            <span class="editorial-kicker">Guidance & Etiquette</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>

          <div class="faq-list">
            <div class="faq-card card-base" *ngFor="let item of faqs; let i = index">
              <button class="faq-question" (click)="toggleFaq(i)" [attr.aria-expanded]="activeFaq === i">
                <span>{{ item.q }}</span>
                <span class="faq-icon">{{ activeFaq === i ? '−' : '+' }}</span>
              </button>
              <div class="faq-answer" *ngIf="activeFaq === i">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. FINAL EDITORIAL CTA -->
      <section class="final-cta-section">
        <div class="container text-center">
          <span class="editorial-kicker">Intimate & Electric</span>
          <h2 class="cta-headline">SEE YOU AFTER DARK.</h2>
          <p class="cta-subtext">
            Spaces fill quickly. Reserve your place on the guestlist for upcoming weekends.
          </p>
          <div class="cta-button-wrap">
            <a routerLink="/events" class="btn btn-primary btn-lg">
              Explore Upcoming Events
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 86vh;
      display: flex;
      align-items: center;
      padding: 80px 0 60px;
      overflow: hidden;

      @media (max-width: 768px) {
        min-height: 75vh;
        padding: 40px 0;
      }
    }

    .hero-background-wrapper {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.38) saturate(0.85);
    }

    .hero-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(11, 12, 14, 0.4) 0%,
        var(--bg-page) 95%
      );
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 900px;
    }

    .hero-kicker-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #f5f2eb;
    }

    .pulse-indicator {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
    }

    .hero-headline {
      font-size: clamp(2.5rem, 6.5vw, 4.8rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.05;
      margin-bottom: 24px;
      text-transform: uppercase;
      color: #ffffff;
    }

    .hero-subtext {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      max-width: 620px;
      line-height: 1.6;
      margin-bottom: 36px;
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .hero-stats-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-radius: var(--radius-md);
      max-width: 720px;

      @media (max-width: 640px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 16px 20px;

        .stat-divider {
          display: none;
        }
      }
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .stat-desc {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .stat-divider {
      width: 1px;
      height: 32px;
      background: var(--border-medium);
    }

    /* Section structure */
    .section {
      padding: 96px 0;

      @media (max-width: 768px) {
        padding: 60px 0;
      }
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 40px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 20px;

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      letter-spacing: -0.01em;
    }

    .view-link {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--accent);

      &:hover {
        text-decoration: underline;
      }
    }

    /* Featured Editorial Card */
    .featured-editorial-card {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      overflow: hidden;
      border-radius: var(--radius-lg);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .featured-image-col {
      position: relative;
      min-height: 420px;

      @media (max-width: 900px) {
        min-height: 280px;
      }
    }

    .featured-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .featured-badge-pill {
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .featured-info-col {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 768px) {
        padding: 24px;
      }
    }

    .feat-top-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 16px;

      .feat-category {
        color: var(--accent);
        font-weight: 700;
      }
    }

    .feat-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      margin-bottom: 16px;
      line-height: 1.1;

      .feat-edition {
        display: block;
        font-size: 1rem;
        letter-spacing: 0.12em;
        color: var(--text-secondary);
        margin-top: 4px;
      }
    }

    .feat-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .feat-highlights-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 32px;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--text-primary);
    }

    .highlight-check {
      color: var(--accent);
      font-weight: bold;
    }

    .feat-action-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-subtle);
      padding-top: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .feat-price {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 0.72rem;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .val {
        font-family: var(--font-display);
        font-size: 1.4rem;
        font-weight: 800;
      }
    }

    /* Events Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    /* Experience Features Grid */
    .experience-header {
      max-width: 740px;
      margin: 0 auto 56px;
    }

    .experience-main-title {
      font-size: clamp(2.2rem, 4.5vw, 3.4rem);
      line-height: 1.1;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }

    .experience-lead {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .feature-card {
      padding: 32px 24px;
      border-radius: var(--radius-md);
      position: relative;
    }

    .feature-number {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--accent);
      margin-bottom: 20px;
      opacity: 0.8;
    }

    .feature-title {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }

    .feature-text {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* FAQ */
    .mb-48 {
      margin-bottom: 48px;
    }

    .text-center {
      text-align: center;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-card {
      overflow: hidden;
      border-radius: var(--radius-md);
    }

    .faq-question {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .faq-icon {
      font-size: 1.4rem;
      color: var(--accent);
      font-weight: 300;
    }

    .faq-answer {
      padding: 0 24px 20px;
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
      border-top: 1px solid var(--border-subtle);
      padding-top: 16px;
    }

    /* Final CTA */
    .final-cta-section {
      padding: 110px 0;
      background: radial-gradient(
        ellipse at bottom,
        var(--bg-surface-elevated) 0%,
        var(--bg-page) 80%
      );
      border-top: 1px solid var(--border-subtle);
    }

    .cta-headline {
      font-size: clamp(2.4rem, 5.5vw, 4.2rem);
      font-weight: 800;
      letter-spacing: -0.01em;
      margin-bottom: 16px;
    }

    .cta-subtext {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto 36px;
    }

    .cta-button-wrap {
      display: flex;
      justify-content: center;
    }
  `]
})
export class HomeComponent {
  private readonly eventService = inject(EventService);

  readonly featuredEvent = this.eventService.events().find(e => e.featured) || this.eventService.events()[0];
  readonly upcomingEvents = this.eventService.events().slice(1, 7);

  activeFaq = 0;

  readonly faqs = [
    {
      q: 'How does the secret venue disclosure work?',
      a: 'To maintain intimate sanctuary and prevent drop-in congestion, exact gate and penthouse addresses are disclosed via SMS/WhatsApp and your digital ticket 6 hours prior to door opening.'
    },
    {
      q: 'What is the attendee age requirement and dress code?',
      a: 'All gatherings are strictly 21+ with government photo identification verified at the entrance scanner. Dress codes favor atmospheric smart casual or tailored dark palettes.'
    },
    {
      q: 'Are tickets transferable if I cannot attend?',
      a: 'Yes, tickets may be transferred to a friend up to 12 hours before doors open through the ticket link in your confirmation pass.'
    },
    {
      q: 'What is the sound policy and photography ethos?',
      a: 'SpotBukk prioritizes present immersion. Most gatherings maintain a strict no-flash photography policy in active listening salons to protect both artists and guests.'
    }
  ];

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }
}
