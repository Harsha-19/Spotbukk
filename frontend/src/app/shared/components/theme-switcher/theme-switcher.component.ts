import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeId, ThemeOption } from '../../../core/models/theme.model';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-overlay" *ngIf="isOpen" (click)="close()">
      <div class="theme-modal glass-panel" (click)="$event.stopPropagation()">
        <div class="theme-modal-header">
          <div>
            <span class="editorial-kicker">Multi-Theme System</span>
            <h3 class="theme-title">Visual Atmosphere</h3>
          </div>
          <button class="close-btn" (click)="close()" aria-label="Close modal">&times;</button>
        </div>

        <p class="theme-subtitle">
          Select an aesthetic profile designed with muted, atmospheric palettes. No neon. No electric blues.
        </p>

        <div class="theme-grid">
          <div
            *ngFor="let theme of themeService.themes"
            class="theme-card"
            [class.active]="themeService.currentTheme() === theme.id"
            (click)="selectTheme(theme.id)"
          >
            <div class="swatches-bar">
              <span class="swatch" [style.background-color]="theme.palette.bg" title="Background"></span>
              <span class="swatch" [style.background-color]="theme.palette.surface" title="Surface"></span>
              <span class="swatch" [style.background-color]="theme.palette.accent" title="Accent"></span>
              <span class="swatch" [style.background-color]="theme.palette.text" title="Text"></span>
            </div>

            <div class="theme-info">
              <div class="theme-header-row">
                <span class="theme-name">{{ theme.name }}</span>
                <span class="active-badge" *ngIf="themeService.currentTheme() === theme.id">Active</span>
              </div>
              <span class="theme-tagline">{{ theme.tagline }}</span>
            </div>
          </div>
        </div>

        <div class="theme-footer">
          <span>Tokens update dynamically across public site & organizer admin.</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 180ms ease-out;
    }

    .theme-modal {
      width: 100%;
      max-width: 520px;
      border-radius: var(--radius-lg);
      padding: 28px;
      box-shadow: var(--shadow-drawer);
      animation: scaleUp 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .theme-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .theme-title {
      font-size: 1.35rem;
      letter-spacing: -0.01em;
    }

    .close-btn {
      font-size: 1.5rem;
      color: var(--text-muted);
      line-height: 1;
      padding: 4px;

      &:hover {
        color: var(--text-primary);
      }
    }

    .theme-subtitle {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .theme-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .theme-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--border-strong);
        transform: translateX(4px);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);
      }
    }

    .swatches-bar {
      display: flex;
      gap: 4px;
      padding: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      flex-shrink: 0;
    }

    .swatch {
      width: 16px;
      height: 24px;
      border-radius: 3px;
      display: block;
    }

    .theme-info {
      flex: 1;
    }

    .theme-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }

    .theme-name {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .active-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
    }

    .theme-tagline {
      font-size: 0.78rem;
      color: var(--text-secondary);
      display: block;
    }

    .theme-footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class ThemeSwitcherComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  readonly themeService = inject(ThemeService);

  selectTheme(themeId: ThemeId): void {
    this.themeService.setTheme(themeId);
    this.close();
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}
