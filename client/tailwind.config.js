// Import Flowbite
const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add Flowbite's content configuration
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Add Flowbite's plugin configuration
    flowbite.plugin(),
  ],
};
