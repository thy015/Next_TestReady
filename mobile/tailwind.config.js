/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{ts,tsx,jsx,js}",
  "./components/**/*.{ts,tsx,jsx,js}",
],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
