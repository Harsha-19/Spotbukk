import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-featured-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="section top5-section" aria-label="Top 5 Experiences">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <div>
            <span class="editorial-kicker">CURATED HIGHLIGHTS</span>
            <h2 class="section-title">TOP 5 EXPERIENCES</h2>
          </div>
          <div class="header-counter">
            <span class="counter-text">{{ activeIndex + 1 }} / {{ featuredCategories.length }}</span>
          </div>
        </div>

        <!-- Wide Cinematic Landscape Showcase Stage (16:9 / 2:1 Wide Banner) -->
        <div
          class="slider-showcase-stage"
          (touchstart)="onTouchStart($event)"
          (touchend)="onTouchEnd($event)"
          (mouseenter)="pauseAutoPlay()"
          (mouseleave)="resumeAutoPlay()"
          tabindex="0"
          (keydown.arrowleft)="prevSlide()"
          (keydown.arrowright)="nextSlide()"
          role="region"
          aria-roledescription="carousel"
        >
          <!-- Left Floating Glass Nav Button -->
          <button
            type="button"
            class="flank-nav-btn prev-btn"
            (click)="prevSlide()"
            aria-label="Previous experience"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <!-- Wide Cinematic Viewport -->
          <div class="poster-card-viewport">
            <div
              class="poster-track"
              [style.transform]="'translateX(-' + (activeIndex * 100) + '%)'"
            >
              <div
                *ngFor="let cat of featuredCategories; let i = index"
                class="poster-slide"
                [class.active]="i === activeIndex"
              >
                <a
                  [routerLink]="['/events/category', cat.slug]"
                  class="tight-poster-card"
                  [attr.aria-label]="cat.name + ' - ' + cat.tagline"
                >
                  <!-- Wide 16:9 Banner Image (Naturally filled background) -->
                  <img
                    [src]="getWideBanner(cat)"
                    [alt]="cat.name"
                    class="poster-img"
                    loading="lazy"
                  />

                  <!-- Floating Hover Overlay -->
                  <div class="card-hover-scrim">
                    <span class="scrim-btn">
                      Explore {{ cat.name }} &rarr;
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Floating Glass Nav Button -->
          <button
            type="button"
            class="flank-nav-btn next-btn"
            (click)="nextSlide()"
            aria-label="Next experience"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <!-- Bottom Controls & Meta Bar -->
        <div class="stage-footer" *ngIf="featuredCategories[activeIndex] as currentCat">
          <div class="experience-meta">
            <span class="rank-badge">#0{{ activeIndex + 1 }} TOP EXPERIENCE</span>
            <h3 class="experience-name">{{ currentCat.name }}</h3>
            <span class="meta-dot">&middot;</span>
            <p class="experience-tagline">"{{ currentCat.tagline }}"</p>
          </div>

          <div class="dots-row" role="tablist">
            <button
              *ngFor="let cat of featuredCategories; let i = index"
              type="button"
              class="dot-indicator"
              [class.active]="i === activeIndex"
              (click)="goToSlide(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1) + ' - ' + cat.name"
              role="tab"
              [attr.aria-selected]="i === activeIndex"
            >
              <span class="dot-fill"></span>
            </button>
          </div>

          <div class="cta-wrap">
            <a
              [routerLink]="['/events/category', currentCat.slug]"
              class="btn btn-primary btn-sm"
            >
              Explore Category &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .top5-section {
      padding: 56px 0 40px;
      position: relative;
    }

    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 16px;
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-top: 4px;
    }

    .header-counter {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-secondary);
      letter-spacing: 0.08em;
    }

    /* Wide Cinematic Showcase Stage */
    .slider-showcase-stage {
      position: relative;
      width: 100%;
      max-width: 1060px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
    }

    /* Floating Glass Nav Buttons positioned over the ambient wings */
    .flank-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(14, 15, 22, 0.78);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all var(--transition-fast);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6);

      &:hover {
        background: var(--accent);
        border-color: var(--accent);
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px var(--accent-glow);
      }

      &:active {
        transform: translateY(-50%) scale(0.95);
      }

      &.prev-btn {
        left: 20px;
      }

      &.next-btn {
        right: 20px;
      }

      @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        &.prev-btn { left: 10px; }
        &.next-btn { right: 10px; }
      }
    }

    /* Wide Cinematic Viewport (16:9 Landscape Banner) */
    .poster-card-viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 360px;
      max-height: 490px;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: #06070a;

      @media (max-width: 900px) {
        min-height: 300px;
      }

      @media (max-width: 640px) {
        aspect-ratio: 16 / 10;
        min-height: 250px;
        border-radius: 14px;
      }
    }

    .poster-track {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 440ms cubic-bezier(0.25, 1, 0.5, 1);
      will-change: transform;
    }

    .poster-slide {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tight-poster-card {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      overflow: hidden;
      background: #050608;
    }

    /* Natural 16:9 banner image completely fills the banner cleanly */
    .poster-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
      transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);

      .tight-poster-card:hover & {
        transform: scale(1.03);
      }
    }

    .card-hover-scrim {
      position: absolute;
      inset: 0;
      z-index: 5;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 60%,
        rgba(6, 7, 10, 0.78) 100%
      );
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      transition: opacity var(--transition-normal);

      .tight-poster-card:hover & {
        opacity: 1;
      }
    }

    .scrim-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      background: var(--accent);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.88rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
      transform: translateY(6px);
      transition: transform var(--transition-fast);

      .tight-poster-card:hover & {
        transform: translateY(0);
      }
    }

    /* Stage Footer */
    .stage-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 780px;
      margin: 20px auto 0;
      padding: 14px 22px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      gap: 16px;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }
    }

    .experience-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        justify-content: center;
      }
    }

    .rank-badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 3px 8px;
      background: var(--accent);
      color: #ffffff;
      border-radius: var(--radius-xs);
    }

    .experience-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .meta-dot {
      color: var(--text-muted);
    }

    .experience-tagline {
      font-size: 0.88rem;
      font-style: italic;
      color: var(--text-secondary);
    }

    .dots-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dot-indicator {
      width: 24px;
      height: 6px;
      padding: 0;
      border-radius: var(--radius-full);
      background: var(--border-medium);
      transition: all var(--transition-smooth);
      cursor: pointer;

      .dot-fill {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }

      &.active {
        width: 38px;
        background: var(--accent);
      }

      &:hover:not(.active) {
        background: var(--text-muted);
      }
    }

    .cta-wrap {
      flex-shrink: 0;
    }
  `]
})
export class FeaturedSliderComponent implements OnInit, OnDestroy {
  private readonly categoryService = inject(CategoryService);

  readonly featuredCategories = this.categoryService.featuredCategories();
  activeIndex = 0;

  getWideBanner(cat: any): string {
    if (!cat) return '';
    if (cat.wideBannerImage) return cat.wideBannerImage;
    const wideMap: Record<string, string> = {
      'pool-party': '/banners/wide-pool-party.jpg',
      'trips': '/banners/wide-trips.jpg',
      'house-party': '/banners/wide-house-party.jpg',
      'college-fest': '/banners/wide-college-fest.jpg',
      'farm-house-party': '/banners/wide-farm-house-party.jpg',
      'riders-collab-party': '/banners/wide-riders-collab-party.jpg',
      'supper-club': '/banners/wide-supper-club.jpg',
      'workshops': '/banners/wide-workshops.jpg',
      'pub-crawling': '/banners/wide-pub-crawling.jpg',
      'jamming-karaoke': '/banners/wide-jamming-karaoke.jpg'
    };
    return wideMap[cat.slug] || cat.bannerImage || '';
  }

  private touchStartX = 0;
  private touchEndX = 0;
  private autoPlayTimer: any = null;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    if (this.featuredCategories.length === 0) return;
    this.activeIndex = (this.activeIndex + 1) % this.featuredCategories.length;
  }

  prevSlide(): void {
    if (this.featuredCategories.length === 0) return;
    this.activeIndex =
      (this.activeIndex - 1 + this.featuredCategories.length) % this.featuredCategories.length;
  }

  goToSlide(index: number): void {
    this.activeIndex = index;
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 40;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  pauseAutoPlay(): void {
    this.stopAutoPlay();
  }

  resumeAutoPlay(): void {
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 3000); // Automatically slides every 3 seconds
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}
