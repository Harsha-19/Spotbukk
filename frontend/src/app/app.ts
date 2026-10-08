import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ThemeService } from './core/services/theme.service';
import { NavigationLoggerService } from './core/services/navigation-logger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  template: `
    <div class="app-root-container">
      <!-- Public Header (shown only on public views) -->
      <app-header *ngIf="!isDedicatedPortalRoute()"></app-header>

      <!-- Main Router Viewport -->
      <main [class.public-main]="!isDedicatedPortalRoute()">
        <router-outlet></router-outlet>
      </main>

      <!-- Public Footer (shown only on public views) -->
      <app-footer *ngIf="!isDedicatedPortalRoute()"></app-footer>

      <!-- Global Toast Notifications Viewport -->
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-root-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .public-main {
      flex: 1;
    }
  `]
})
export class App {
  private readonly router = inject(Router);
  readonly themeService = inject(ThemeService); // Ensure theme initialized on launch
  private readonly navigationLogger = inject(NavigationLoggerService); // Ensure centralized router logger active

  readonly isAdminRoute = signal<boolean>(false);
  readonly isStaffRoute = signal<boolean>(false);

  isDedicatedPortalRoute(): boolean {
    return this.isAdminRoute() || this.isStaffRoute();
  }

  constructor() {
    this.updateRouteState(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateRouteState(event.urlAfterRedirects);
        // Scroll to top on navigation unless fragment is present
        if (!event.urlAfterRedirects.includes('#')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  private updateRouteState(url: string): void {
    this.isAdminRoute.set(url.startsWith('/admin'));
    this.isStaffRoute.set(url.startsWith('/staff'));
  }
}
