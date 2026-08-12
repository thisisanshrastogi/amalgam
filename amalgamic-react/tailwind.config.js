/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F2EA",
        surface: "#FFFFFF",
        brand: "#171613",
        accent: "#2C4035",
        highlight: "#8DC4AC",
        muted: "#6B6658",
        border: "#E2DFD5",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}
