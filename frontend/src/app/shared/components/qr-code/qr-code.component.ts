import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qr-container" [style.width.px]="size" [style.height.px]="size">
      <svg
        [attr.viewBox]="'0 0 ' + matrixSize + ' ' + matrixSize"
        class="qr-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Background -->
        <rect width="100%" height="100%" fill="#ffffff" rx="8" />

        <!-- Top-Left Finder Pattern -->
        <rect x="2" y="2" width="7" height="7" fill="#111111" rx="1" />
        <rect x="3" y="3" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="4" y="4" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Top-Right Finder Pattern -->
        <rect x="20" y="2" width="7" height="7" fill="#111111" rx="1" />
        <rect x="21" y="3" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="22" y="4" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Bottom-Left Finder Pattern -->
        <rect x="2" y="20" width="7" height="7" fill="#111111" rx="1" />
        <rect x="3" y="21" width="5" height="5" fill="#ffffff" rx="0.5" />
        <rect x="4" y="22" width="3" height="3" fill="#111111" rx="0.5" />

        <!-- Timing Patterns -->
        <g fill="#111111">
          <rect x="10" y="4" width="1" height="1" rx="0.2"/>
          <rect x="12" y="4" width="1" height="1" rx="0.2"/>
          <rect x="14" y="4" width="1" height="1" rx="0.2"/>
          <rect x="16" y="4" width="1" height="1" rx="0.2"/>
          <rect x="18" y="4" width="1" height="1" rx="0.2"/>

          <rect x="4" y="10" width="1" height="1" rx="0.2"/>
          <rect x="4" y="12" width="1" height="1" rx="0.2"/>
          <rect x="4" y="14" width="1" height="1" rx="0.2"/>
          <rect x="4" y="16" width="1" height="1" rx="0.2"/>
          <rect x="4" y="18" width="1" height="1" rx="0.2"/>
        </g>

        <!-- Simulated Data Matrix Points based on payload hash -->
        @for (dot of dots(); track $index) {
          <rect
            [attr.x]="dot.x"
            [attr.y]="dot.y"
            width="0.9"
            height="0.9"
            rx="0.2"
            fill="#111111"
          />
        }

        <!-- Central subtle emblem -->
        <circle cx="14.5" cy="14.5" r="2.2" fill="#ffffff" stroke="#111111" stroke-width="0.6" />
        <text
          x="14.5"
          y="15.2"
          text-anchor="middle"
          font-family="'Syne', sans-serif"
          font-size="1.4"
          font-weight="800"
          fill="#111111"
        >N</text>
      </svg>
    </div>
  `,
  styles: [`
    .qr-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    .qr-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class QrCodeComponent {
  @Input() value: string = 'SpotBukk-TICKET-DEMO';
  @Input() size: number = 180;

  readonly matrixSize = 29;

  // Generate pseudo-random deterministic data dots based on payload string
  readonly dots = computed(() => {
    const list: { x: number; y: number }[] = [];
    const text = this.value || 'SpotBukk-PASS';
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
      seed = (seed * 31 + text.charCodeAt(i)) & 0xffffffff;
    }

    const pseudoRandom = (x: number, y: number) => {
      const n = Math.sin(seed + x * 374761393 + y * 668265263) * 43758.5453;
      return n - Math.floor(n);
    };

    for (let y = 1; y < this.matrixSize - 1; y++) {
      for (let x = 1; x < this.matrixSize - 1; x++) {
        // Skip finder areas
        if (
          (x <= 9 && y <= 9) || // Top-left
          (x >= 19 && y <= 9) || // Top-right
          (x <= 9 && y >= 19) || // Bottom-left
          (x >= 12 && x <= 16 && y >= 12 && y <= 16) // Center logo
        ) {
          continue;
        }

        if (pseudoRandom(x, y) > 0.48) {
          list.push({ x, y });
        }
      }
    }

    return list;
  });
}
