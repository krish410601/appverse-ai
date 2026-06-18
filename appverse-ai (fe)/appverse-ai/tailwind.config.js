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
        primary: {
          DEFAULT: '#6366F1', // Indigo 500
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Violet 500
          dark: '#7c3aed',
          light: '#a78bfa',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan 500
          dark: '#0891b2',
          light: '#22d3ee',
        },
        dark: {
          DEFAULT: '#0F172A', // Slate 900
          card: '#1E293B',    // Slate 800
          hover: '#334155',   // Slate 700
          border: '#334155',  // Slate 700
          bg: '#0B0F19',      // Darker Slate
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.01)' },
        }
      }
    },
  },
  plugins: [],
}
