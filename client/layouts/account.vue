<template>
  <div style="min-height: 640px" class="bg-gray-100">
    <div
      class="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900"
      @keydown.escape="sidebarHide"
    >
      <AccountMobileSidebar :links="links" />

      <AccountDesktopSidebar :links="links" />

      <div class="flex flex-col flex-1 w-0 overflow-hidden">
        <div class="relative z-10 flex flex-shrink-0 h-16 bg-white">
          <button
            class="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden dark:bg-gray-700 dark:text-white"
            @click.stop="sidebarShow"
          >
            <span class="sr-only">Open sidebar</span>
            <HeroIconOutLineMenuAlt2 class="w-6 h-6" />
          </button>
          <div class="flex justify-end flex-1 px-4 dark:bg-gray-800">
            <div class="flex items-center ml-4 md:ml-6">
              <!-- <NotificationsDropdown /> -->
              <SharedProfileDropdown />
            </div>
          </div>
        </div>

        <main
          class="relative flex-1 overflow-y-auto focus:outline-none"
          tabindex="0"
          x-data=""
          x-init="$el.focus()"
        >
          <div class="py-6">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <Nuxt />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import HeroIconOutLineMenuAlt2 from '@/assets/vectors/heroicon/outline/menu-alt-2.svg?inline'

export default {
  components: {
    HeroIconOutLineMenuAlt2,
  },

  data() {
    return {
      links: [
        {
          url: '/account',
          text: 'Profile',
        },
        {
          url: '/account/personal-information',
          text: 'Personal Information',
        },
        {
          url: '/account/security',
          text: 'Security',
        },
        {
          url: '/account/devices',
          text: 'Devices',
        },
      ],
    }
  },

  methods: {
    async sidebarHide() {
      try {
        await this.$store.commit('account/SET_SIDEBAR_OPEN', false)
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },

    async sidebarShow() {
      try {
        await this.$store.commit('account/SET_SIDEBAR_OPEN', true)
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },
  },
}
</script>
