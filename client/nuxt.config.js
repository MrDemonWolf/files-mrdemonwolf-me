export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'share',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/vClickOutside',
      ssr: false,
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: [100, 300, 400, 500, 700, 900],
          Montserrat: [100, 300, 400, 500, 700, 900],
        },
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  /**
   * color-mode configuration
   */
  colorMode: {
    classSuffix: '',
  },

  /**
   * purgeCSS configuration
   */
  purgeCSS: {
    whitelist: ['dark'],
  },

  publicRuntimeConfig: {
    title: process.env.SITE_TITLE || 'Share',
    description:
      process.env.SITE_DESCRIPTION ||
      'Advanced custom uploader with web front-end.  Allows uploads for  images, files, and text.',
    copyright: process.env.COPYRIGHT || 'Share',
    copyrightLink:
      process.env.COPYRIGHT_LINK || 'https://www.mrdemonwolf.github.io/wolfpal',
    registration: process.env.REGISTRATION || true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
