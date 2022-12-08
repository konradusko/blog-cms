/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.{js,css,min.css}',
    './node_modules/tailwindcss-animatecss/dist/js/**/*.{js,css,min.css}'
  ],
  theme: {
    screens: {
      'sm': {'max': '639px'},

      'md': {'max': '767px'},

      'lg': {'max': '1023px'},

      'xl': {'max': '1279px'},
    },
    extend: {   spacing: {
      '72': '18rem',
      '84': '21rem',
      '96': '24rem',
    },},
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
