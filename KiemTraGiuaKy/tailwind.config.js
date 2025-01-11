const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "**/*.html"
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
    backgroundImage: {
      'hero-pattern': "url('/img/gfn-landing-page.png')",
      'footer-texture': "url('/img/gfn-landing-page.png')",
      'backgruondgf': "url('/img/geforcenow.Section3.png)",
      'backgruondgf2': "url('/img/geforcenow.games_v21Mobile.png)"
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
