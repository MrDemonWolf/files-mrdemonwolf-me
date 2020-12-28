module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#EDF1F9',
          200: '#D1DBF0',
          300: '#B6C5E7',
          400: '#7F9AD4',
          500: '#486EC2',
          600: '#4163AF',
          700: '#2B4274',
          800: '#203257',
          900: '#16213A',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
    },
  },
  plugins: [],
}
