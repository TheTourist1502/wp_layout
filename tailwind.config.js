// Tokens from DESIGN.md via CSS vars in src/styles.css (see .claude/docs/styling-and-theming.md).
const v = (name) => `hsl(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  // ponytail: remotes are styled by the host's Tailwind build, so it scans sibling repos too.
  // Give each remote its own CSS build if they ever deploy without this workspace layout.
  content: ['./index.html', './src/**/*.{ts,tsx}', '../wp_*/src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: { DEFAULT: v('primary'), active: v('primary-active'), disabled: v('primary-disabled') },
      'on-primary': v('on-primary'),
      'accent-teal': v('accent-teal'),
      'accent-amber': v('accent-amber'),
      success: v('success'),
      warning: v('warning'),
      error: v('error'),
      canvas: v('canvas'),
      'surface-soft': v('surface-soft'),
      'surface-card': v('surface-card'),
      'surface-dark': { DEFAULT: v('surface-dark'), elevated: v('surface-dark-elevated') },
      'on-dark': { DEFAULT: v('on-dark'), soft: v('on-dark-soft') },
      hairline: { DEFAULT: v('hairline'), soft: v('hairline-soft') },
      ink: v('ink'),
      body: v('body'),
      muted: { DEFAULT: v('muted'), soft: v('muted-soft') },
    },
    fontFamily: {
      display: ['"Cormorant Garamond"', 'Garamond', 'serif'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      'display-xl': ['64px', { lineHeight: '1.05', letterSpacing: '-1.5px' }],
      'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-1px' }],
      'display-md': ['36px', { lineHeight: '1.15', letterSpacing: '-0.5px' }],
      'display-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.3px' }],
      'title-lg': ['22px', { lineHeight: '1.3' }],
      'title-md': ['18px', { lineHeight: '1.4' }],
      'title-sm': ['16px', { lineHeight: '1.4' }],
      'body-md': ['16px', { lineHeight: '1.55' }],
      'body-sm': ['14px', { lineHeight: '1.55' }],
      caption: ['13px', { lineHeight: '1.4' }],
      'caption-upper': ['12px', { lineHeight: '1.4', letterSpacing: '1.5px' }],
      button: ['14px', { lineHeight: '1' }],
    },
    borderRadius: { none: '0', xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
    boxShadow: { none: 'none', sm: '0 1px 3px rgba(20,20,19,0.08)' },
  },
};
