import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: '#07090e',
          light: '#f8fafc',
        },
        surface: {
          dark: 'rgba(15, 23, 42, 0.65)',
          light: 'rgba(255, 255, 255, 0.8)',
        },
        accent: {
          primary: '#ff2d55',
          glow: 'rgba(255, 45, 85, 0.25)',
          cyan: '#00f2fe',
        },
        glass: {
          border: {
            dark: 'rgba(255, 255, 255, 0.08)',
            light: 'rgba(0, 0, 0, 0.06)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 25px -5px rgba(255, 45, 85, 0.4)',
      }
    },
  },
  plugins: [],
};
