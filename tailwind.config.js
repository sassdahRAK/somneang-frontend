/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#f472b6',
          purple: '#a855f7',
          dark: '#7c3aed',
        },
        surface: {
          900: '#0d0d14',
          800: '#13131f',
          700: '#1a1a2e',
          600: '#22223b',
          500: '#2d2d4a',
          400: '#3d3d5c',
        }
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
