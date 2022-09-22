/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "dracula",
      "cupcake",
      "synthwave",
      "valentine",
      "halloween",
      "coffee",
    ],
  },
};
