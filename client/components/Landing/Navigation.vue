<template>
  <nav
    class="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6"
    aria-label="Global"
  >
    <div class="flex items-center flex-1">
      <div class="flex items-center justify-between w-full md:w-auto">
        <nuxt-link to="/" class="ml-1">
          <span class="sr-only">{{ $config.title }}</span>
          <Logo
            class="w-auto h-8 sm:h-10 text-primary-600 dark:text-white"
            :alt="`${$config.title} Logo`"
          />
        </nuxt-link>
        <div class="flex items-center mr-1 md:hidden">
          <button
            id="main-menu"
            type="button"
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md dark:bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
            aria-haspopup="true"
            x-bind:aria-expanded="open"
            @click="uncollapseMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              x-description="Heroicon name: menu"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="hidden space-x-10 md:flex md:ml-10">
        <nuxt-link
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          class="font-medium text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-200 font-montserrat"
          >{{ link.text }}</nuxt-link
        >
      </div>
    </div>
    <div class="hidden md:flex">
      <nuxt-link
        to="/login"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm font-montserrat dark:text-black bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Log in
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Logo from '@/assets/vectors/logo.svg?inline'

export default {
  components: {
    Logo,
  },
  props: {
    links: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async uncollapseMobileMenu() {
      await this.$store.dispatch('landing/SHOW_MOBILE_NAVIGATION')
    },
  },
}
</script>
