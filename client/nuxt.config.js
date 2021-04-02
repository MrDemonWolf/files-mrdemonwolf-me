export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Share',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.SITE_DESCRIPTION ||
          'Simple yet advanced NodeJS, MongoDB and Express based uploader.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  loading: false,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        icons: {
          regular: ['faMoon'],
          solid: ['faSun', 'faCheck', 'faSkull', 'faCog', 'faCircle'],
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
    '@nuxtjs/svg',
    // Doc: https://github.com/shakee93/vue-toasted
    '@nuxtjs/toast',
    'nuxt-user-agent',
    'portal-vue/nuxt',
    '@nuxtjs/dayjs',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    https: false,
    credentials: true,
  },
  proxy: {
    '/api/': {
      target: process.env.API_URI || 'http://localhost:8080',
      pathRewrite: {
        '^/api/': '/',
      },
    },
  },

  /*
   ** Auth configuration
   */
  auth: {
    redirect: {
      home: '/dashboard',
    },
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
        autoLogout: false,
      },
    },
  },

  /*
   ** Color mode configuration
   */
  colorMode: {
    classSuffix: '',
  },

  /*
   ** Runtime configuration
   */
  publicRuntimeConfig: {
    title: process.env.SITE_TITLE || 'Share',
    description:
      process.env.SITE_DESCRIPTION ||
      'Simple yet advanced NodeJS, MongoDB and Express based uploader..',
    copyright: process.env.COPYRIGHT || 'Share',
    copyrightLink:
      process.env.COPYRIGHT_LINK || 'https://www.mrdemonwolf.github.io/share',
    registration: process.env.REGISTRATION || true,
    landing: {
      description:
        process.env.LANDING_DESCRIPTION ||
        'Simple yet advanced NodeJS, MongoDB and Express based uploader.',
      button: {
        enabled: process.env.LANDING_BUTTON,
        text: process.env.LANDING_BUTTON_TEXT || '',
        url: process.env.LANDING_BUTTON_URL || '',
      },
    },
  },

  /**
   * purgeCSS configuration
   */
  purgeCSS: {
    whitelist: ['dark'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
