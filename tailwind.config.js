/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: { xs: '480px' },
      colors: {
        bg: token('bg'),
        elev: token('elev'),
        soft: token('soft'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        faint: token('faint'),
        accent: {
          DEFAULT: token('accent'),
          ink: token('accent-ink'),
          text: token('accent-text'),
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7.4vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
        h1: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        h2: ['clamp(1.6rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        lead: ['clamp(1.05rem, 1.6vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
      },
      maxWidth: { site: '82rem' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgb(var(--accent) / 0.55)' },
          '70%': { boxShadow: '0 0 0 10px rgb(var(--accent) / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(var(--accent) / 0)' },
        },
        wave: { '0%, 100%': { transform: 'scaleY(0.35)' }, '50%': { transform: 'scaleY(1)' } },
        scan: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(var(--scan-distance, 160px))' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-out infinite',
        wave: 'wave 1.4s ease-in-out infinite',
        scan: 'scan 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
