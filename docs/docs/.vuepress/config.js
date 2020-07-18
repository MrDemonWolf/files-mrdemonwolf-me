const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Share",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/assets/img/icons/android-icon-192x192.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/img/icons/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/assets/img/icons/favicon-96x96.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/img/icons/favicon-16x16.png"
      }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#303059" }],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/assets/img/icons/msapplication-icon-144x144.png"
      }
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/assets/img/icons/apple-touch-icon-57x57.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/assets/img/icons/apple-touch-icon-60x60.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/assets/img/icons/apple-touch-icon-72x72.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/assets/img/icons/apple-touch-icon-76x76.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/assets/img/icons/apple-touch-icon-114x114.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/assets/img/icons/apple-touch-icon-120x120.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/assets/img/icons/apple-touch-icon-144x144.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/assets/img/icons/apple-touch-icon-152x152.png"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/assets/img/icons/apple-touch-icon-180x180.png"
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["link", { rel: "icon", href: "/favico.ico" }],
    ["meta", { name: "theme-color", content: "#303059" }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    // defaultTheme: { light: [6, 18], dark: [18, 6] },
    logo: "/assets/img/logo.png",

    repo: "MrDemonWolf/share",
    editLinks: true,
    docsDir: "docs/docs",
    editLinkText: "",
    lastUpdated: true,
    nav: [
      {
        text: "Guide",
        link: "/guide/"
      },
      {
        text: "Config",
        link: "/config/"
      },
      {
        text: "API",
        link: "/api/"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          sidebarDepth: 2,
          children: ["getting-started"]
        }
      ],
      "/api/": [
        {
          title: "API Reference",
          collapsable: false,
          sidebarDepth: 2,
          children: ["", "auth", "account", "client", "admin"]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    "vuepress-plugin-reading-time",
    ["vuepress-plugin-code-copy", true]
  ],
  postcss: {
    plugins: [
      require("tailwindcss")("./tailwind.config.js"),
      require("autoprefixer")
    ]
  },
  port: 3000
};
