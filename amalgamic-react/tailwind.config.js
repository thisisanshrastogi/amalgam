/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F1D17",
        surface: "#16211C",
        brand: "#F0EAD6",
        accent: "#9CD3B0",
        highlight: "#C9EBD4",
        muted: "#9CB3A3",
        border: "#253B2E",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}
