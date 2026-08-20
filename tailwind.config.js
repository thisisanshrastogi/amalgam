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
        paper: "#F5F2EA",
        ink: "#171613",
        mint: "#64B387",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}
