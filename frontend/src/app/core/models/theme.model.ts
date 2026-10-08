export type ThemeId = 'Burgundy';

export interface ThemeRgb {
  r: number;
  g: number;
  b: number;
}

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  hex: string;
  rgb: ThemeRgb;
  palette: {
    bg: string;
    surface: string;
    accent: string;
    text: string;
    hex?: string;
    rgb?: ThemeRgb;
  };
}

export const BURGUNDY_THEME: ThemeOption = {
  id: 'Burgundy',
  name: 'Burgundy',
  tagline: 'Deep charcoal, warm white & signature burgundy',
  hex: '#800020',
  rgb: {
    r: 128,
    g: 0,
    b: 32
  },
  palette: {
    bg: '#0b0c0e',
    surface: '#121417',
    accent: '#800020',
    text: '#f5f2eb',
    hex: '#800020',
    rgb: {
      r: 128,
      g: 0,
      b: 32
    }
  }
};

export const THEME: ThemeOption = BURGUNDY_THEME;
export const THEMES: ThemeOption[] = [BURGUNDY_THEME];
