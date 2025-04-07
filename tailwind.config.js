/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          150: "#ededed",
          200: "#e5e5e5",
          250: "#dedede",
          300: "#d4d4d4",
          350: "#b5b5b5",
          400: "#a3a3a3",
          450: "#8a8a8a",
          470: "#808080",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          750: "#363636",
          800: "#262626",
          900: "#171717",
        },
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};
