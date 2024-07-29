/** @type {import('tailwindcss').Config} */
const tailwindlogoical = require('tailwindcss-logical');
const plugin = require('./src/theme/tailwind/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  plugins: [tailwindlogoical, plugin],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
};
