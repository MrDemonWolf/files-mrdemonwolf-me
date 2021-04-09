<template>
  <div class="relative ml-3">
    <div>
      <button
        id="user-menu"
        v-click-outside="hide"
        aria-haspopup="true"
        x-bind:aria-expanded="dropDownOpen"
        class="flex items-center max-w-xs p-2 text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-primary-100 font-roboto dark:bg-gray-700"
        @keydown.esc="hide"
        @click="toggle"
      >
        <span class="sr-only">Dropdown user menu</span>
        {{ $auth.user.username }}
        <fa :icon="['fas', 'caret-down']" class="w-5 h-5 ml-2 align-middle" />
      </button>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
      ><div
        v-if="dropDownOpen"
        x-description="Profile dropdown panel, show/hide based on dropdown state."
        class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-200"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <nuxt-link
          to="/account"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dakr:text-white"
          role="menuitem"
          @click.native="hide"
          >My Profile</nuxt-link
        >

        <button
          role="menuitem"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dakr:text-white"
          @click.prevent="signout"
        >
          Sign out
        </button>
      </div></transition
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropDownOpen: false,
    }
  },

  mounted() {
    this.popupItem = this.$el
  },

  methods: {
    toggle() {
      this.dropDownOpen = !this.dropDownOpen
    },

    show() {
      this.dropDownOpen = true
    },

    hide() {
      this.dropDownOpen = false
    },

    async signout() {
      await this.$auth.logout()
    },
  },
}
</script>
