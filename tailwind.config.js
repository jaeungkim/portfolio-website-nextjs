/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        hakgyoansim: ["var(--font-hakgyoansim)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
