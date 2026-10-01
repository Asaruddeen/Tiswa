/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tiswa: {
          50: '#f0f7f1',
          100: '#dcefe0',
          200: '#b9dfc2',
          300: '#8cc89b',
          400: '#4fa468',
          500: '#2a8348',
          600: '#1e6f3f',
          700: '#15803d',
          800: '#0f4c2a',
          900: '#0a3a20',
          950: '#062414',
        },
        gold: { 300: '#e6c46a', 400: '#d9ae45', 500: '#c9a03d', 600: '#a88229' },
        cream: { 50: '#fbf8ef', 100: '#f6f1e3', 200: '#ece3cb' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        floatSlow: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-10px) rotate(3deg)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        ring: { '0%': { transform: 'scale(1)', opacity: '.55' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        screenIn: { from: { opacity: 0, transform: 'translateX(14px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 7s ease-in-out infinite',
        spinSlow: 'spinSlow 60s linear infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        ring: 'ring 2s ease-out infinite',
        fadeUp: 'fadeUp .8s cubic-bezier(.2,.7,.2,1) both',
        screenIn: 'screenIn .45s ease-out both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
