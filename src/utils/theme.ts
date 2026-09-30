export type Theme = 'light' | 'dark';

const KEY = 'theme';
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/** User's pick if they made one, otherwise the OS preference. */
export function currentTheme(): Theme {
  return storedTheme() ?? (systemDark.matches ? 'dark' : 'light');
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', currentTheme() === 'dark');
}

export function initTheme() {
  applyTheme();
  systemDark.addEventListener('change', applyTheme);
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Storage blocked: the choice lasts until reload.
  }
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
