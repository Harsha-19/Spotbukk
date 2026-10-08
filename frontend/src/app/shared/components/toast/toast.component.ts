import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-viewport" *ngIf="toastService.toasts().length > 0">
      <div
        *ngFor="let toast of toastService.toasts()"
        class="toast-item"
        [ngClass]="'toast-' + toast.type"
      >
        <div class="toast-accent-line"></div>
        <div class="toast-content">
          <div class="toast-title">{{ toast.title }}</div>
          <div class="toast-desc" *ngIf="toast.message">{{ toast.message }}</div>
        </div>
        <button class="toast-close" (click)="toastService.dismiss(toast.id)" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-viewport {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 380px;
      width: calc(100vw - 32px);
      pointer-events: none;
    }

    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: stretch;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-drawer);
      overflow: hidden;
      animation: slideIn 220ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .toast-accent-line {
      width: 4px;
      background: var(--accent);
      flex-shrink: 0;
    }

    .toast-success .toast-accent-line {
      background: var(--badge-success-text);
    }

    .toast-error .toast-accent-line {
      background: var(--badge-error-text);
    }

    .toast-warning .toast-accent-line {
      background: var(--badge-warning-text);
    }

    .toast-content {
      padding: 12px 16px;
      flex: 1;
    }

    .toast-title {
      font-family: var(--font-display);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.02em;
    }

    .toast-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: 3px;
      line-height: 1.4;
    }

    .toast-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      line-height: 1;
      padding: 0 14px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        color: var(--text-primary);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
