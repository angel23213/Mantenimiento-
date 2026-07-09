/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Bebas Neue"', 'cursive'],
        'body': ['"DM Sans"', 'sans-serif'],
        'accent': ['"Permanent Marker"', 'cursive'],
      },
      colors: {
        'fire': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'lemon': {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        'char': {
          900: '#0a0a0a',
          800: '#141414',
          700: '#1c1c1c',
          600: '#242424',
        }
      },
      animation: {
        'flame-1': 'flame1 2s ease-in-out infinite',
        'flame-2': 'flame2 2.5s ease-in-out infinite',
        'flame-3': 'flame3 1.8s ease-in-out infinite',
        'flicker': 'flicker 0.15s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'ember': 'ember 3s ease-in infinite',
      },
      keyframes: {
        flame1: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(-2deg)', opacity: '0.9' },
          '50%': { transform: 'scaleY(1.15) scaleX(0.92) rotate(2deg)', opacity: '1' },
        },
        flame2: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(3deg)', opacity: '0.8' },
          '50%': { transform: 'scaleY(1.2) scaleX(0.88) rotate(-3deg)', opacity: '1' },
        },
        flame3: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1) rotate(0deg)', opacity: '0.7' },
          '33%': { transform: 'scaleY(1.1) scaleX(0.95) rotate(-4deg)', opacity: '0.9' },
          '66%': { transform: 'scaleY(0.95) scaleX(1.05) rotate(4deg)', opacity: '0.85' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ember: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) translateX(var(--drift)) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
