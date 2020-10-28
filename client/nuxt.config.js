export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.IP || '127.0.0.1', // default: localhost
  },
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
  plugins: [{ src: '~/plugins/filters' }, { src: '~/plugins/percentageCal' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        icons: {
          regular: ['faMoon'],
          solid: ['faCaretDown', 'faSun', 'faSkull', 'faCog'],
        },
      },
    ],
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
    '@nuxtjs/auth-next',
    '@nuxtjs/svg',
    // Doc: https://github.com/shakee93/vue-toasted
    '@nuxtjs/toast',
    'nuxt-user-agent',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { proxy: true },
  proxy: {
    '/api/': {
      target: process.env.API_URI || 'http://localhost:8080',
      pathRewrite: {
        '^/api/': '/',
      },
    },
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1000 * 60 * 5, //  5 mins
          type: 'Bearer',
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 1000 * 60 * 60 * 24 * 14, // Two Weeks
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/account', method: 'get' },
          logout: { url: '/api/auth/logout', method: 'post' },
        },
        // autoLogout: false
      },
    },
  },

  publicRuntimeConfig: {
    title: process.env.SITE_TITLE || 'Share',
    copyright: process.env.COPYRIGHT || 'Share',
    copyrightLink:
      process.env.COPYRIGHT_LINK || 'https://www.mrdemonwolf.github.io/share',
    registration: process.env.REGISTRATION || true,
  },

  /*
   ** Toast configuration
   */
  toast: {
    position: 'top-right',
    duration: 6500,
  },

  /**
   * purgeCSS configuration
   */
  purgeCSS: {
    whitelist: ['dark-mode'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
