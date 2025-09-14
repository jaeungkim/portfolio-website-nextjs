/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        suit: ["var(--font-suit)"],
        maruburi: ["var(--font-maruburi)"],
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};
