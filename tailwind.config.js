/** @type {import('tailwindcss').Config} */
const tailwindcssLogical = require('tailwindcss-logical');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssLogical, // Add this line
  ],
};
