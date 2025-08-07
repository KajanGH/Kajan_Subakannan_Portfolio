/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",          // all root-level HTML
    "./about.html",      // any extra pages
    "./js/**/*.js",      // all JS files in /js/ and subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

