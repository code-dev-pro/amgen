/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        notoSans: ['Noto Sans Variable', 'sans-serif'],
        almaq: ['Almaq', 'sans-serif'],
        'white-on-black': ['White on Black', 'sans-serif'],
      },
      colors: {
        'primary-dark-blue': '#00004E',
        'primary-light-blue': '#E6F4FF',
        'footer-dark-blue': '#030535',
        'accent-yellow': '#FFE900',
        'accent-pink': '#FF9CB2',
        'accent-red': '#C81806',
        'accent-purple': '#703684',
        'accent-brown': '#511F0D',
        'accent-blue': '#00BCE4',
        'accent-green': '#2BC76A',
        'secondary-blue': '#003B8C',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        scanner: '3s scan 0s infinite linear both',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        scan: {
          from: {
            transform: 'rotate(0deg) translateY(-150px) rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg) translateY(-150px) rotate(-360deg)',
          },
        },
      },
      screens: {
        'aspect-16/9': { raw: '(min-aspect-ratio: 16/9)' },
      },
    },
  },
  plugins: [],
};
