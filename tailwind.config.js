/** @type {import('tailwindcss').Config} */
const tailwindcssLogical = require('tailwindcss-logical');

const tailwindcssPlugin = require('./src/layouts/materialize-layout/@core/tailwind/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [tailwindcssLogical, tailwindcssPlugin],
};
