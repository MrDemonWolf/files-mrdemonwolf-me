<template>
  <header id="header" class="dark:bg-gray-700">
    <nav class="container mx-auto flex-wrap p-6 flex justify-between">
      <div
        class="flex items-center flex-no-shrink text-primary-500 dark:text-white"
      >
        <Logo width="40px" height="40px" />
        <span class="font-semibold text-xl ml-2">{{ title }}</span>
      </div>
      <div class="md:hidden flex items-center">
        <button
          class="px-3 py-2 border rounded text-primary-500 border-primary-500 hover:text-primary-400 hover:border-primary-400"
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
        class="w-full md:flex md:items-center md:w-auto"
        :class="mobileNavActive ? 'block' : 'hidden'"
      >
        <ul v-if="isAuthenticated" class="list-reset md:flex justify-end">
          <li v-for="(link, text) in links" :key="text" :value="link">
            <nuxt-link
              class="inline-block md:inline-block no-underline hover:text-underline text-primary-500 hover:text-secondary-500 dark:text-white dark-hover:text-secondary-200 py-2 md:py-1 md:px-2 font-roboto"
              :to="link"
              >{{ text }}</nuxt-link
            >
          </li>
        </ul>
        <ul v-else class="list-reset md:flex justify-end">
          <li>
            <nuxt-link
              class="inline-block no-underline text-primary-500 hover:text-secondary-500 py-2 md:py-1 md:px-2 dark:text-white font-roboto"
              to="/register"
              >Register
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="inline-block no-underline text-primary-500 hover:text-secondary-500 dark:text-white dark-hover:text-secondary-200 py-2 md:py-1 md:px-2 font-roboto"
              to="/login"
              >Login
            </nuxt-link>
          </li>
        </ul>
        <div
          v-if="!isAuthenticated"
          class="relative inline-block text-left md:block"
        >
          <button
            class="py-2 md:py-1 md:px-2 focus:outline-none"
            aria-label="Color Mode"
            @click="
              $colorMode.value === 'dark'
                ? ($colorMode.preference = 'light')
                : ($colorMode.preference = 'dark')
            "
          >
            <fa
              v-if="$colorMode.value === 'light'"
              :icon="['far', 'sun']"
              width="1.25rem"
              height="1.25rem"
            />
            <fa
              v-else
              :icon="['far', 'moon']"
              width="1.25rem"
              height="1.25rem"
            />
          </button>
        </div>
        <div
          v-if="isAuthenticated"
          class="relative inline-block text-left md:block"
        >
          <button
            v-click-outside="accountDropdownHide"
            type="button"
            class="py-2 md:py-1 md:px-2 focus:outline-none inline-flex justify-center w-full font-bold text-blue-700 dark:text-white transition ease-in-out duration-150 font-roboto"
            @keydown.esc="accountDropdownHide"
            @click.prevent="accountDropdown"
          >
            {{ user.username }}
            <span class="ml-2" title="Verified account">
              <Verified width="1.25rem" height="1.25rem" />
            </span>
          </button>
          <div
            class="origin-top-left md:origin-top-right absolute left-0 md:right-0 mt-2 w-30 md:w-50"
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
                <theme-switcher
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                />
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
      </div>
    </nav>
  </header>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import Logo from '@/components/Shared/Logo'
import ThemeSwitcher from '@/components/Shared/ThemeSwitcher'
import Verified from '@/components/Shared/Verified'

export default {
  components: {
    Logo,
    ThemeSwitcher,
    Verified,
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
    return {
      user: {
        username: 'MrDemonWolf',
      },
      isAuthenticated: true,
      mobileNavActive: false,
      accountNavActive: false,
      theme: '',
    }
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },

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
