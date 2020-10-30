/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    // compatible with @nuxtjs/color-mode
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        primary: {
          50: '#F3F3F5',
          100: '#E6E8EB',
          200: '#C2C5CC',
          300: '#9DA1AD',
          400: '#535B70',
          500: '#091533',
          600: '#08132E',
          700: '#050D1F',
          800: '#040917',
          900: '#03060F',
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
    },
    borderStyles: {
      styles: true, // defaults to false
      colors: true, // defaults to false
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
      'disabled',
    ],
    backgroundImage: ['responsive', 'dark'],
    gradientColorStops: ['responsive', 'dark'],
    borderColor: [
      'dark',
      'dark-focus',
      'dark-focus-within',
      'hover',
      'responsive',
    ],
    textColor: [
      'dark',
      'dark-hover',
      'dark-active',
      'hover',
      'responsive',
      'disabled',
    ],
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('@tailwindcss/ui')({
      // See https://tailwindui.com/documentation#configuring-sidebar-breakpoints
      // Turning this off for now. This may be buggy as it makes the hero sections like the "with wide angled image on right" look funky
      // https://tailwindui.com/components/marketing/sections/heroes
      // layout: 'sidebar',
    }),
    require('tailwindcss-border-styles')(),
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
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
