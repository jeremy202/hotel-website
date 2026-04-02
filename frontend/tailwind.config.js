/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f5ef",
          100: "#f1eadf",
          200: "#e3d5be",
          300: "#d4c09e",
          400: "#c5ab7d",
          500: "#b6965d",
          600: "#94784a",
          700: "#725b38",
          800: "#513d25",
          900: "#2f2013",
        },
        accent: "#C8A97E",
        ink: "#121212",
      },
      boxShadow: {
        card: "0 18px 35px rgba(0,0,0,0.18)",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(120deg, rgba(18,18,18,0.72), rgba(18,18,18,0.3))",
      },
    },
  },
  plugins: [],
};
