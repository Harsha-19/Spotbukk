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

        <!-- Tight Poster Showcase Stage: < Previous | [ POSTER CARD ] | Next > -->
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
          <!-- Left Arrow Button -->
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

          <!-- Tight Poster Card Viewport -->
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
                  <img
                    [src]="cat.bannerImage"
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

          <!-- Right Arrow Button -->
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

    /* Tight Showcase Stage: < Previous | [ POSTER ] | Next > */
    .slider-showcase-stage {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin: 0 auto;
      outline: none;

      @media (max-width: 640px) {
        gap: 10px;
      }
    }

    .flank-nav-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-subtle);

      &:hover {
        background: var(--accent);
        color: #ffffff;
        border-color: var(--accent);
        transform: scale(1.08);
      }

      &:active {
        transform: scale(0.96);
      }

      @media (max-width: 640px) {
        width: 38px;
        height: 38px;
      }
    }

    /* Viewport wraps tightly around the poster */
    .poster-card-viewport {
      position: relative;
      /* Balanced size: fits desktop screens without vertical scroll or empty space */
      width: 460px;
      max-width: calc(100vw - 120px);
      overflow: hidden;
      border-radius: var(--radius-lg);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border-medium);
      background: #000000;

      @media (max-width: 768px) {
        width: 380px;
      }

      @media (max-width: 480px) {
        width: 300px;
        max-width: calc(100vw - 90px);
      }
    }

    .poster-track {
      display: flex;
      width: 100%;
      transition: transform 420ms cubic-bezier(0.25, 1, 0.5, 1);
      will-change: transform;
    }

    .poster-slide {
      flex: 0 0 100%;
      width: 100%;
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tight-poster-card {
      position: relative;
      display: block;
      width: 100%;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      overflow: hidden;
    }

    .poster-img {
      width: 100%;
      height: auto;
      display: block;
      /* Natural rendering: no stretching, no cutoffs */
      object-fit: contain;
      transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);

      .tight-poster-card:hover & {
        transform: scale(1.025);
      }
    }

    .card-hover-scrim {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.75) 100%
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
      padding: 10px 20px;
      background: var(--accent);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.88rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
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
    }, 6000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}
