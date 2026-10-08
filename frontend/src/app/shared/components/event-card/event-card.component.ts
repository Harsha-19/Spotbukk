import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventItem } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="event-card card-base" [class.featured-layout]="featured">
      <!-- Media Wrap -->
      <a [routerLink]="['/events', event.id]" class="media-link">
        <div class="image-wrapper">
          <img [src]="event.heroImage" [alt]="event.title" loading="lazy" class="card-img" />
          <div class="media-overlay"></div>
          
          <!-- Badges on media -->
          <div class="card-badges">
            <span class="category-tag">{{ event.category }}</span>
            <span
              class="status-pill"
              [ngClass]="'status-' + event.availability.toLowerCase().replace(' ', '-')"
            >
              {{ event.availability }}
            </span>
          </div>

          <div class="date-capsule">
            <span class="date-text">{{ event.date }}</span>
          </div>
        </div>
      </a>

      <!-- Content -->
      <div class="card-content">
        <div class="location-row">
          <span class="city">{{ event.city }}</span>
          <span class="dot">·</span>
          <span class="venue">{{ event.venue }}</span>
        </div>

        <a [routerLink]="['/events', event.id]" class="title-link">
          <h3 class="event-title">
            {{ event.title }}
            <span class="event-edition">{{ event.edition }}</span>
          </h3>
        </a>

        <p class="event-subtitle" *ngIf="featured || showSubtitle">{{ event.subtitle }}</p>

        <!-- Meta footer -->
        <div class="card-footer">
          <div class="price-block">
            <span class="price-label">Tickets From</span>
            <span class="price-value">₹{{ event.startingPrice }}</span>
          </div>

          <div class="action-block">
            <a [routerLink]="['/events', event.id]" class="btn btn-subtle btn-sm">
              View Event
            </a>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .event-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg-surface);
      height: 100%;

      &:hover {
        .card-img {
          transform: scale(1.05);
        }
      }
    }

    .media-link {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 240px;
      overflow: hidden;
      background: var(--bg-surface-elevated);
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%);
    }

    .card-badges {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .category-tag {
      font-size: 0.72rem;
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

    .date-capsule {
      position: absolute;
      bottom: 12px;
      left: 14px;
      z-index: 2;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 4px 10px;
      border-radius: var(--radius-sm);

      .date-text {
        font-size: 0.74rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: #f5f2eb;
      }
    }

    .card-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .location-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;

      .city {
        color: var(--accent);
      }

      .venue {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .event-title {
      font-size: 1.15rem;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
      line-height: 1.25;

      .event-edition {
        display: block;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        color: var(--text-secondary);
        margin-top: 2px;
      }
    }

    .event-subtitle {
      font-size: 0.84rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price-block {
      display: flex;
      flex-direction: column;
    }

    .price-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .price-value {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  `]
})
export class EventCardComponent {
  @Input({ required: true }) event!: EventItem;
  @Input() featured = false;
  @Input() showSubtitle = true;
}
