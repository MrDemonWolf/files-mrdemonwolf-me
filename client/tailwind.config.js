/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    // compatible with @nuxtjs/color-mode
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        primary: {
          100: '#eaeaee',
          200: '#cbcbd6',
          300: '#acacbd',
          400: '#6e6e8b',
          500: '#303059',
          600: '#2b2b50',
          700: '#1d1d35',
          800: '#161628',
          900: '#0e0e1b',
        },
        secondary: {
          100: '#E6F3F9',
          200: '#C0E2F0',
          300: '#9AD1E7',
          400: '#4EAED6',
          500: '#028BC4',
          600: '#027DB0',
          700: '#015376',
          800: '#013F58',
          900: '#012A3B',
        },
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover',
      'responsive',
    ],
    backgroundImage: {
      'responsive',
      'dark',
    },
    borderColor: [
      'dark',
      'dark-focus',
      'dark-focus-within',
      'hover',
      'responsive',
    ],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.h-80': {
          height: '80vh',
        },
      }

      addUtilities(newUtilities)
    }),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
