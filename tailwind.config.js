/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1fa37c",
        primaryDark: "#178a67",
        softBg: "#eef7f3",
        panelBg: "#ffffff",
        cardBg: "#f4fbf7",
        borderSoft: "#bfe7d7",
        textSoft: "#5f7d73",
        greenInk: "#0f5132",
        greenLine: "#1fa37c",
        greenLine2: "#6bc4a5",
        warn: "#f4b740",
        off: "#9aa6b2"
      }
    },
  },
  plugins: [],
}