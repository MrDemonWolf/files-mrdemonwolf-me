<template>
  <div
    v-if="$store.state.landing.showMobileNavigation"
    x-cloak=""
    x-description="Mobile menu, show/hide based on menu open state."
    class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
  >
    <div
      class="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
    >
      <div class="flex items-center justify-between px-5 pt-4">
        <div>
          <Logo
            class="w-auto h-8 sm:h-10 text-primary-500 dark:text-white"
            :alt="`${$config.title} Logo`"
          />
        </div>
        <div class="-mr-2">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            @click="collapseMobileMenu"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="w-6 h-6"
              x-description="Heroicon name: x"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
        <div class="px-2 pt-2 pb-3 space-y-1" role="none">
          <nuxt-link
            v-for="link in links"
            :key="link"
            :to="link.url"
            class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 font-montserrat"
            role="menuitem"
            >{{ link.text }}</nuxt-link
          >
        </div>
        <div role="none">
          <login
            to="/login"
            class="block w-full px-5 py-3 font-medium text-center text-white dark:text-black bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 hover:bg-primary-500 font-montserrat"
            role="menuitem"
          >
            Log in
          </login>
        </div>
      </div>
    </div>
  </div>
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
    async collapseMobileMenu() {
      await this.$store.dispatch('landing/HIDE_MOBILE_NAVIGATION')
    },
  },
}
</script>
