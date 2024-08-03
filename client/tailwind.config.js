/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
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
        'xs': '450px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
