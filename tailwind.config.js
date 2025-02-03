import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-success',
    'bg-success/50',
    'bg-danger',
    'bg-danger/50',
    'bg-extremeGreed',
    'bg-greed',
    'bg-fear',
    'bg-extremeFear',
    'text-success',
    'text-success/50',
    'text-danger',
    'text-danger/50',
    'text-extremeGreed',
    'text-greed',
    'text-fear',
    'text-extremeFear',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        success: '#87d85f',
        danger: '#da805a',
        extremeGreed: '#87d85f',
        greed: '#b9d85a',
        fear: '#daaf5a',
        extremeFear: '#da805a',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            success: '#87d85f',
            danger: '#da805a',
            extremeGreed: '#87d85f',
            greed: '#b9d85a',
            fear: '#daaf5a',
            extremeFear: '#da805a',
          },
        },
        dark: {
          colors: {
            success: '#87d85f',
            danger: '#da805a',
            extremeGreed: '#87d85f',
            greed: '#b9d85a',
            fear: '#daaf5a',
            extremeFear: '#da805a',
          },
        },
      },
    }),
  ],
};
