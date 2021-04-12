/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const tailwindcssForms = require('@tailwindcss/forms')
const tailwindcssTypography = require('@tailwindcss/typography')
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio')
const tailwindBorderStyles = require('tailwindcss-border-styles')

module.exports = {
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
  // compatible with @nuxtjs/color-mode
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f9',
          100: '#eaecf2',
          200: '#cbcedf',
          300: '#abb1cb',
          400: '#6c77a4',
          500: '#2d3c7d',
          600: '#293671',
          700: '#222d5e',
          800: '#1b244b',
          900: '#161d3d',
        },
      },
      height: {
        80: '80vh',
        84: '84vh',
        85: '85vh',
        90: '90vh',
        95: '95vh',
      },
      borderWidth: {
        6: '6px',
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderStyles: {
        styles: true, // defaults to false
        colors: true, // defaults to false
      },
    },
  },
  variants: {},
  plugins: [
    tailwindcssForms,
    tailwindcssTypography,
    tailwindcssAspectRatio,
    tailwindBorderStyles(),
  ],
}
