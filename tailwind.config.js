/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        suit: ["var(--font-suit)"],
        maruburi: ["var(--font-maruburi)"],
        hakgyoansim: ["var(--font-hakgyoansim)"],
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};
