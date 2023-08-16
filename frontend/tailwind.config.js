/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E1927",
      },
      fontFamily: {
        mont: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        beba: ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
