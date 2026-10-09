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
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.6rem, 7vw, 6.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        h1: ['clamp(2.1rem, 4.6vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.6rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.05rem, 1.6vw, 1.22rem)', { lineHeight: '1.65', letterSpacing: '0' }],
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
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -4%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 5%, 0) scale(0.96)' },
        },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-out infinite',
        wave: 'wave 1.4s ease-in-out infinite',
        scan: 'scan 4s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
