import { Injectable, signal } from '@angular/core';
import { THEMES, ThemeId, ThemeOption } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'SpotBukk_active_theme';
  readonly themes: ThemeOption[] = THEMES;
  readonly currentTheme = signal<ThemeId>('Burgundy');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeId;
    if (saved && THEMES.some(t => t.id === saved)) {
      this.setTheme(saved);
    } else {
      this.setTheme('Burgundy');
    }
  }

  setTheme(themeId: ThemeId): void {
    this.currentTheme.set(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem(this.STORAGE_KEY, themeId);
  }

  getCurrentThemeDetails(): ThemeOption {
    return this.themes.find(t => t.id === this.currentTheme()) || this.themes[0];
  }
}
