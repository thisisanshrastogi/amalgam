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
        accent: "#7E9E88",
        highlight: "#B4D4BD",
        muted: "#62756A",
        border: "#1E3025",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}
