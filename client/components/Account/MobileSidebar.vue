<template>
  <div
    v-if="$store.state.account.sidebarOpen"
    class="md:hidden"
    x-description="Off-canvas menu for mobile, show/hide based on off-canvas menu state."
  >
    <div class="fixed inset-0 z-40 flex">
      <transition
        enter-active-class="transition-opacity duration-300 ease-linear"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-linear"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        ><div
          v-if="$store.state.account.sidebarOpen"
          x-description="Off-canvas menu overlay, show/hide based on off-canvas menu state."
          aria-hidden="true"
          class="fixed inset-0"
          @click="sidebarHide"
        >
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div></div
      ></transition>
      <transition
        enter-active-class="transition duration-300 ease-in-out transform"
        enter-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-300 ease-in-out transform"
        leave-class="translate-x-0"
        leave-to-class="-translate-x-full"
        ><div
          v-if="$store.state.account.sidebarOpen"
          x-description="Off-canvas menu, show/hide based on off-canvas menu state."
          class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white dark:bg-gray-800"
        >
          <div class="absolute top-0 right-0 pt-2 -mr-12">
            <button
              v-if="$store.state.account.sidebarOpen"
              class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="sidebarHide"
            >
              <span class="sr-only">Close sidebar</span>
              <svg
                class="w-6 h-6 text-white"
                x-description="Heroicon name: outline/x"
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
          <div
            class="flex items-center flex-shrink-0 px-4 text-primary-500 dark:text-primary-300"
          >
            <Logo
              class="inline-block w-auto h-8"
              :alt="`${$config.title} Logo`"
            />
            <span class="ml-3 text-xl font-bold align-middle font-roboto">
              {{ $config.title }}</span
            >
          </div>
          <div class="flex-1 h-0 mt-5 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <nuxt-link
                v-for="(link, index) in links"
                :key="index"
                :to="link.url"
                class="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md dark:text-white dark:hover:text-gray-900 hover:bg-gray-50 hover:text-gray-900 group"
                @click.native="sidebarHide"
              >
                {{ link.text }}
              </nuxt-link>
            </nav>
          </div>
          <div class="flex flex-shrink-0 pt-2 pl-2 border-t border-gray-200">
            <nuxt-link
              to="/dashboard"
              class="flex-shrink-0 block px-2 text-gray-600 rounded-md group dark:text-white dark:hover:text-gray-900 hover:bg-gray-50 hover:text-gray-900"
            >
              <div class="flex items-center">
                <fa
                  :icon="['fas', 'arrow-left']"
                  class="inline-block w-10 h-10 mr-2 text-lg"
                />
                <div class="ml-3">Back to Dashboard</div>
              </div>
            </nuxt-link>
          </div>
        </div></transition
      >
      <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
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
    },
  },

  methods: {
    async sidebarShow() {
      try {
        await this.$store.commit('account/SET_SIDEBAR_OPEN', true)
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },

    async sidebarHide() {
      try {
        await this.$store.commit('account/SET_SIDEBAR_OPEN', false)
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply bg-gray-100 text-gray-900;
}
.dark .nuxt-link-exact-active {
  @apply bg-gray-100 text-gray-900;
}
</style>
