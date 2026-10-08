import { Injectable, inject, isDevMode, ApplicationRef } from '@angular/core';
import {
  Router,
  NavigationStart,
  RoutesRecognized,
  GuardsCheckStart,
  GuardsCheckEnd,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  NavigationSkipped,
  Event as RouterEvent
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export interface NavigationLogRecord {
  timestamp: string;
  event: string;
  navigationId: number;
  from: string;
  to: string;
  durationMs: number;
  status: 'success' | 'cancelled' | 'error' | 'skipped' | 'in-progress';
  reason?: string;
  error?: string;
  trigger?: string;
}

interface ActiveNavigation {
  id: number;
  startTime: number;
  from: string;
  to: string;
  trigger?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationLoggerService {
  private readonly router = inject(Router);
  private readonly appRef = inject(ApplicationRef);

  private readonly STORAGE_KEY = 'SpotBukk_navigation_logs';
  private readonly MAX_LOGS = 500;

  private currentUrl = '/';
  private readonly activeNavigations = new Map<number, ActiveNavigation>();
  private initialized = false;

  private readonly logsSubject = new BehaviorSubject<NavigationLogRecord[]>([]);
  public readonly logs$: Observable<NavigationLogRecord[]> = this.logsSubject.asObservable();

  constructor() {
    this.init();
  }

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Load initial logs into subject for reactive consumers
    this.refreshMemoryLogs();

    // Determine initial URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      this.currentUrl = `${path}${search}${hash}` || '/';
    }

    if (this.isLoggingEnabled()) {
      console.log('[SpotBukk APP]\nApplication initialized');
      if (typeof window !== 'undefined') {
        (window as any).__SpotBukkRouter = this.router;
        (window as any).__SpotBukkLogger = this;
      }
    }

    // Lifecycle: App ready
    this.appRef.isStable
      .pipe(
        filter((stable) => !!stable),
        take(1)
      )
      .subscribe(() => {
        if (this.isLoggingEnabled()) {
          console.log('[SpotBukk APP]\nApplication ready');
        }
      });

    // Centralized Router Event Stream
    this.router.events.subscribe((event: RouterEvent) => {
      this.handleRouterEvent(event);
    });
  }

  public isLoggingEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    if (isDevMode()) return true;
    try {
      return window.localStorage?.getItem('SpotBukk_enable_nav_logging') === 'true';
    } catch {
      return false;
    }
  }

  private handleRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.onNavigationStart(event);
    } else if (event instanceof RoutesRecognized) {
      this.onRoutesRecognized(event);
    } else if (event instanceof GuardsCheckStart) {
      this.onGuardsCheckStart(event);
    } else if (event instanceof GuardsCheckEnd) {
      this.onGuardsCheckEnd(event);
    } else if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event);
    } else if (event instanceof NavigationCancel) {
      this.onNavigationCancel(event);
    } else if (event instanceof NavigationError) {
      this.onNavigationError(event);
    } else if (event instanceof NavigationSkipped) {
      this.onNavigationSkipped(event);
    }
  }

  private onNavigationStart(event: NavigationStart): void {
    const from = this.currentUrl;
    const to = event.url;
    const startTime = performance.now();

    this.activeNavigations.set(event.id, {
      id: event.id,
      startTime,
      from,
      to,
      trigger: event.navigationTrigger
    });

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nNavigationStart\nFROM: ${from}\nTO: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationStart',
      navigationId: event.id,
      from,
      to,
      durationMs: 0,
      status: 'in-progress',
      trigger: event.navigationTrigger
    });
  }

  private onRoutesRecognized(event: RoutesRecognized): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.urlAfterRedirects || event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nRoutesRecognized\nFROM: ${from}\nTO: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'RoutesRecognized',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: 'in-progress'
    });
  }

  private onGuardsCheckStart(event: GuardsCheckStart): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nGuardsCheckStart\nURL: ${to}\nID: ${event.id}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'GuardsCheckStart',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: 'in-progress'
    });
  }

  private onGuardsCheckEnd(event: GuardsCheckEnd): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const elapsed = active ? Math.round(performance.now() - active.startTime) : 0;

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(
        `[SpotBukk ROUTER] ${timeStr}\nGuardsCheckEnd\nURL: ${to}\nID: ${event.id}\nStatus: ${event.shouldActivate ? 'PASSED' : 'BLOCKED'
        }`
      );
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'GuardsCheckEnd',
      navigationId: event.id,
      from,
      to,
      durationMs: elapsed,
      status: event.shouldActivate ? 'in-progress' : 'cancelled',
      reason: event.shouldActivate ? undefined : 'Guard activation blocked'
    });
  }

  private onNavigationEnd(event: NavigationEnd): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.urlAfterRedirects || event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;

    this.currentUrl = to;
    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(
        `[SpotBukk ROUTER] ${timeStr}\nNavigationEnd\nFROM: ${from}\nTO: ${to}\nID: ${event.id}\nDuration: ${durationMs}ms\nStatus: SUCCESS`
      );
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationEnd',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'success'
    });
  }

  private onNavigationCancel(event: NavigationCancel): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const reason = event.reason || 'Navigation cancelled by guard or redirect';

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      console.warn(`[SpotBukk ROUTER]\nNavigationCancel\nURL: ${to}\nReason: ${reason}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationCancel',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'cancelled',
      reason
    });
  }

  private onNavigationError(event: NavigationError): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const errorMsg = String(event.error?.message || event.error || 'Unknown navigation error');

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      console.error(`[SpotBukk ROUTER ERROR]\nNavigationError\nURL: ${to}\nError: ${errorMsg}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationError',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'error',
      error: errorMsg
    });
  }

  private onNavigationSkipped(event: NavigationSkipped): void {
    const active = this.activeNavigations.get(event.id);
    const from = active ? active.from : this.currentUrl;
    const to = event.url;
    const durationMs = active ? Math.max(1, Math.round(performance.now() - active.startTime)) : 0;
    const reason = event.reason || 'Navigation skipped (target same as current URL)';

    this.activeNavigations.delete(event.id);

    if (this.isLoggingEnabled()) {
      const timeStr = this.getFormattedTime();
      console.log(`[SpotBukk ROUTER] ${timeStr}\nNavigationSkipped\nURL: ${to}\nID: ${event.id}\nReason: ${reason}`);
    }

    this.logNavigation({
      timestamp: new Date().toISOString(),
      event: 'NavigationSkipped',
      navigationId: event.id,
      from,
      to,
      durationMs,
      status: 'skipped',
      reason
    });
  }

  public logNavigation(record: NavigationLogRecord): void {
    if (!this.isLoggingEnabled()) return;
    if (typeof window === 'undefined') return;

    try {
      const logs = this.getLogs();
      const updated = [record, ...logs].slice(0, this.MAX_LOGS);
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      this.logsSubject.next(updated);
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to persist log record to localStorage', err);
    }
  }

  public getLogs(): NavigationLogRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to read logs from localStorage', err);
      return [];
    }
  }

  public clearLogs(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(this.STORAGE_KEY);
      this.logsSubject.next([]);
    } catch (err) {
      console.error('[SpotBukk ROUTER] Failed to clear logs from localStorage', err);
    }
  }

  public getRecentLogs(limit: number = 50): NavigationLogRecord[] {
    return this.getLogs().slice(0, limit);
  }

  public exportLogsAsJson(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  }

  public downloadLogsJson(): void {
    if (typeof window === 'undefined') return;
    const jsonStr = this.exportLogsAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `SpotBukk-navigation-logs-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private refreshMemoryLogs(): void {
    const current = this.getLogs();
    this.logsSubject.next(current);
  }

  private getFormattedTime(date: Date = new Date()): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
}
