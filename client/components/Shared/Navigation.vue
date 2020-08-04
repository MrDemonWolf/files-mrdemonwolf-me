<template>
  <header id="header" class="dark:bg-gray-700">
    <nav
      class="container mx-auto flex-wrap p-6 flex items-center justify-between"
    >
      <div
        class="flex items-center flex-no-shrink text-blue-700 dark:text-white"
      >
        <Logo width="40px" height="40px" />
        <span class="font-semibold text-xl tracking-tight ml-2">{{
          title
        }}</span>
      </div>
      <div class="block md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
          @click.prevent="navigationActive"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        class="text-black w-full flex-grow md:flex md:items-center md:w-auto md:block"
        :class="mobileNavActive ? 'block' : 'hidden'"
      >
        <ul class="list-reset md:flex justify-end flex-1 items-center">
          <li v-for="(link, text) in links" :key="text" :value="link">
            <nuxt-link
              class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 dark:text-white"
              :to="link"
              >{{ text }}</nuxt-link
            >
          </li>
        </ul>
        <div class="relative inline-block text-left">
          <div>
            <button
              v-click-outside="accountDropdownHide"
              type="button"
              class="focus:outline-none inline-flex justify-center w-full leading-5 font-medium text-blue-700 dark:text-white transition ease-in-out duration-150"
              @keydown.esc="accountDropdownHide"
              @click.prevent="accountDropdown"
            >
              {{ 'MrDemonWolf' }}
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            class="origin-top-left md:origin-top-right absolute left-0 md:right-0 mt-2 w-56 rounded-md shadow-lg"
            :class="accountNavActive ? 'block' : 'hidden'"
          >
            <div
              class="rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1">
                <span class="block px-4 py-2 text-sm leading-5 text-gray-700"
                  >Role: <strong>Owner</strong></span
                >
              </div>
              <div class="border-t border-gray-100"></div>
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  >Account</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  >Admin</a
                >
              </div>
              <div class="border-t border-gray-100"></div>
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  >Logout</a
                >
              </div>
            </div>
          </div>
        </div>
        <theme-switcher :theme="theme" @themeChanged="updateTheme" />
        <!-- <div>
          <a
            href="#"
            class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 sm:mt-0"
            >Download</a
          >
        </div> -->
      </div>
    </nav>
  </header>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import Logo from '@/components/Shared/Logo'
import ThemeSwitcher from '@/components/Shared/ThemeSwitcher'

export default {
  components: {
    Logo,
    ThemeSwitcher,
  },
  directives: {
    ClickOutside,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Share',
    },
    links: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { mobileNavActive: false, accountNavActive: false, theme: '' }
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
    this.theme = localStorage.getItem('nuxt-color-mode') || 'system'
  },

  // do not forget this section

  methods: {
    navigationActive() {
      this.mobileNavActive = !this.mobileNavActive
    },
    accountDropdown() {
      this.accountNavActive = !this.accountNavActive
    },
    accountDropdownHide() {
      this.accountNavActive = false
    },
    updateTheme(theme) {
      this.theme = theme
    },
  },
}
</script>
<style lang="postcss" scoped>
.dark-mode .nuxt-link-active {
  @apply text-blue-700;
}

.nuxt-link-active {
  @apply text-red-700;
}
</style>
