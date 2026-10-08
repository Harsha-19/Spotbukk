import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-explore-experiences',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="section explore-section" id="explore-experiences" aria-label="Explore Experiences">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <div>
            <span class="editorial-kicker">CURATED CATEGORIES</span>
            <h2 class="section-title">EXPLORE EXPERIENCES</h2>
            <p class="section-subtitle">
              Browse intimate gatherings, road trips, private dining, and electric nights curated across 12 distinct vibes.
            </p>
          </div>
        </div>

        <!-- 12 Category Grid -->
        <div class="category-grid">
          <div
            *ngFor="let cat of categories; let i = index"
            class="category-card-col"
          >
            <a
              [routerLink]="['/events/category', cat.slug]"
              class="category-card card-base"
              [attr.aria-label]="cat.name"
            >
              <!-- Media Wrap -->
              <div class="card-media">
                <img
                  [src]="cat.bannerImage"
                  [alt]="cat.name"
                  loading="lazy"
                  class="category-img"
                />
                <div class="media-overlay"></div>
                <div class="card-badges">
                  <span class="number-tag">#0{{ i + 1 }}</span>
                  <span class="featured-badge" *ngIf="cat.featured">Top 5</span>
                </div>
              </div>

              <!-- Body -->
              <div class="card-body">
                <h3 class="category-title">{{ cat.name }}</h3>
                <p class="category-tagline">{{ cat.tagline }}</p>

                <div class="card-footer-cta">
                  <span class="explore-label">Explore</span>
                  <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .explore-section {
      padding: 48px 0 64px;
    }

    .section-header {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    .section-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 640px;
      line-height: 1.55;
    }

    /* Responsive Grid: Desktop 4 / Tablet 2-3 / Mobile 1-2 */
    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    .category-card-col {
      display: flex;
    }

    .category-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: all var(--transition-normal);
      text-decoration: none;
      color: inherit;

      &:hover {
        transform: translateY(-4px);
        border-color: var(--border-medium);
        box-shadow: var(--shadow-elevated);

        .category-img {
          transform: scale(1.06);
        }

        .card-footer-cta {
          color: var(--accent);

          .arrow-icon {
            transform: translateX(4px);
          }
        }
      }
    }

    .card-media {
      position: relative;
      width: 100%;
      height: 220px;
      background: var(--bg-surface-elevated);
      overflow: hidden;

      @media (max-width: 600px) {
        height: 200px;
      }
    }

    .category-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.65) 100%);
      pointer-events: none;
    }

    .card-badges {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .number-tag {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 3px 8px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-xs);
      color: #ffffff;
    }

    .featured-badge {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 3px 8px;
      background: var(--accent);
      border-radius: var(--radius-xs);
      color: #ffffff;
    }

    .card-body {
      padding: 16px 18px 18px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .category-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.25;
      margin-bottom: 6px;
      color: var(--text-primary);
    }

    .category-tagline {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.45;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-footer-cta {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--text-primary);
      transition: color var(--transition-fast);
    }

    .arrow-icon {
      transition: transform var(--transition-fast);
    }
  `]
})
export class ExploreExperiencesComponent {
  private readonly categoryService = inject(CategoryService);

  readonly categories = this.categoryService.allCategories();
}
