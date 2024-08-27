/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6528F7",
        sec: "#40128B",
        theme: "#FF204E",
        btn: "#FF004D",
      },
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
      screens: {
        xs: "450px",
        ...defaultTheme.screens,
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-20px)" },
        },
        slideInTop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-in",
        slideInTop: "slideInTop 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
