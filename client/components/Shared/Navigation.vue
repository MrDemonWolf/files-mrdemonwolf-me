<template>
  <header id="header" class="dark:bg-gray-700">
    <nav class="container mx-auto p-6 flex items-center justify-between">
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
              class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 md:py-1 md:px-2 dark:text-white font-roboto"
              :to="link"
              >{{ text }}</nuxt-link
            >
          </li>
        </ul>
        <div
          class="relative inline-block text-left py-2 md:py-1 md:px-2 md:block"
        >
          <button
            v-click-outside="accountDropdownHide"
            type="button"
            class="focus:outline-none inline-flex justify-center w-full leading-5 font-medium text-blue-700 dark:text-white transition ease-in-out duration-150 font-roboto"
            @keydown.esc="accountDropdownHide"
            @click.prevent="accountDropdown"
          >
            {{ 'MrDemonWolf' }}
            <span class="inline-flex leading-none" title="Verified account"
              ><svg
                width="1.25rem"
                height="1.25rem"
                viewBox="0 0 17 17"
                class="VerifiedIcon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-767.000000, -573.000000)">
                    <g transform="translate(-80.000000, -57.000000)">
                      <g transform="translate(100.000000, 77.000000)">
                        <g transform="translate(400.000000, 401.000000)">
                          <g transform="translate(347.000000, 152.000000)">
                            <path
                              d="M1.74035847,11.2810213 C1.61434984,11.617947 1.54545455,11.982746 1.54545455, 12.3636364 C1.54545455,14.0706983 2.92930168,15.4545455 4.63636364,15.4545455 C5.01725401,15.4545455 5.38205302,15.3856502 5.71897873,15.2596415 C6.22025271,16.2899361 7.2772042,17 8.5,17 C9.7227958,17 10.7797473,16.2899361 11.2810213,15.2596415 L11.2810213,15.2596415 C11.617947,15.3856502 11.982746,15.4545455 12.3636364,15.4545455 C14.0706983,15.4545455 15.4545455,14.0706983 15.4545455,12.3636364 C15.4545455,11.982746 15.3856502,11.617947 15.2596415,11.2810213 C16.2899361,10.7797473 17,9.7227958 17,8.5 C17,7.2772042 16.2899361,6.22025271 15.2596415,5.71897873 C15.3856502,5.38205302 15.4545455,5.01725401 15.4545455,4.63636364 C15.4545455,2.92930168 14.0706983,1.54545455 12.3636364,1.54545455 C11.982746,1.54545455 11.617947,1.61434984 11.2810213,1.74035847 C10.7797473,0.71006389 9.7227958,0 8.5,0 C7.2772042,0 6.22025272,0.71006389 5.71897873,1.74035847 C5.38205302,1.61434984 5.01725401,1.54545455 4.63636364,1.54545455 C2.92930168,1.54545455 1.54545455,2.92930168 1.54545455,4.63636364 C1.54545455,5.01725401 1.61434984,5.38205302 1.74035847,5.71897873 C0.71006389,6.22025272 0,7.2772042 0,8.5 C0,9.7227958 0.71006389,10.7797473 1.74035847,11.2810213 L1.74035847,11.2810213 Z"
                              class="verified-bg"
                              opacity="1"
                              fill="#303059"
                            ></path>
                            <path
                              d="M11.2963464,5.28945679 L6.24739023,10.2894568 L7.63289664,10.2685106 L5.68185283,8.44985845 C5.27786241,8.07328153 4.64508754,8.09550457 4.26851062,8.499495 C3.8919337,8.90348543 3.91415674,9.53626029 4.31814717,9.91283721 L6.26919097,11.7314894 C6.66180802,12.0974647 7.27332289,12.0882198 7.65469737,11.7105432 L12.7036536,6.71054321 C13.0960757,6.32192607 13.0991603,5.68876861 12.7105432,5.29634643 C12.3219261,4.90392425 11.6887686,4.90083965 11.2963464,5.28945679 L11.2963464,5.28945679 Z"
                              class="verified-check"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </button>
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
        <div class="text-left md:block">
          <theme-switcher
            class="inline-flex md:justify-center w-full py-2 md:py-1 md:px-2"
            :theme="theme"
            @themeChanged="updateTheme"
          />
          <!-- <div>
          <a
            href="#"
            class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 sm:mt-0"
            >Download</a
          >
        </div> -->
        </div>
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
