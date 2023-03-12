/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/posts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_primary_dark: "#35343D",
        custom_blue:{
          100: "#054CFF",
        },
        custom_pink: {
          100: "#FFDBD8",
          200: "#FFCECF",
          300: "#ff059B",
        },
        custom_yellow: {
          100: "#EFD5C0",
          200: "#EFD5C0",
        },
        custom_grey: {
          100: "#E4E2DA",
          200: "#F9F9F9",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
