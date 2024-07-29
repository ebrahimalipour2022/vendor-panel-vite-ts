/** @type {import('tailwindcss').Config} */
const tailwindlogoical = require("tailwindcss-logical")
const plugin = require("./src/theme/tailwind/plugin")

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
    corePlugins: {
        preflight: false
    },
    plugins: [tailwindlogoical, plugin],
    theme: {
        extend: {}
    }
}
