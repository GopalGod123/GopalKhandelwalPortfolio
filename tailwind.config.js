/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
          },
          dark: {
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        },
        fontFamily: {
          code: ['Fira Code', 'monospace'],
        },
        animation: {
          'wave': 'wave 2s ease-in-out infinite',
          'blink': 'blink 1s infinite',
          'bounce-slow': 'bounce 2s infinite',
        },
        keyframes: {
          wave: {
            '0%, 50%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(20deg)' },
            '75%': { transform: 'rotate(-20deg)' },
          },
          blink: {
            '0%, 50%': { opacity: '1' },
            '51%, 100%': { opacity: '0' },
          }
        }
      },
    },
    plugins: [],
  }
  