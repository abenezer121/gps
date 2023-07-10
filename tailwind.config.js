/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,tx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
       
        rubik: ["Rubik"],
      },
      backgroundImage: {
        'full-back': "url('/src/assets/images/full.png')",
      },
      screens: {
        xxs: '300px',
        xs: '500px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#F3C651',
        'dark': '#111',
        'white': '#fff',
        'grey': '#333',
        'prime': '#219653',
        'secondary': '#F2994A',
        'bgprimary': '#1A1F32',
        'btnprimary': '#e79057'
      },  
    },
  },
  plugins: [
    plugin(function({matchUtilities, theme}) {
      matchUtilities(
        {
          textShadow: (value) => ({
            textShadow: "-1px 1px 16px "+value
          })
        }, {
          values: theme('colors')
        }
      )
    })
  ],
}
