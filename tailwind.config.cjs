const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/**/*.{svelte, js, ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.amber[100],
        secondary: colors.gray[200],
        parchment: "#fefcaf",
        ghost: "rgba(221, 204, 204, 0.5)"
      },
      animation: {
        'spin-slow': 'spin 3s ease-in-out infinite',
        'spin': 'spin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
      },
      width: {
        "md": "900px"
      }
    },
    container: {
      center: true,
    }
  }
};
