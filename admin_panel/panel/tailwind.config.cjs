/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/**/**.{vue,js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.{js,css,min.css}',
    './node_modules/tailwindcss-animatecss/dist/js/**/*.{js,css,min.css}'
  ],
  theme: {
  
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tw-elements/dist/plugin'),
 
  ],
}
