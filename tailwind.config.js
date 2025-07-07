export default {
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        techLineMove: {
          '0%': { transform: 'rotate(45deg) translateX(-100%)', opacity: '0.3' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'rotate(45deg) translateX(100vw)', opacity: '0.3' },
        },
      },
      animation: {
        techLineMove: 'techLineMove 12s linear infinite',
      },
    },
  },
  plugins: [],
};
