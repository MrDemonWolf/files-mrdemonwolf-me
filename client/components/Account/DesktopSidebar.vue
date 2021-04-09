<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <div class="flex flex-col flex-1 h-0">
        <div
          class="flex items-center flex-shrink-0 h-16 px-4 bg-white dark:bg-gray-800 dark:text-primary-100 text-primary-500"
        >
          <Logo
            class="inline-block w-auto h-8"
            :alt="`${$config.title} Logo`"
          />
          <span class="ml-3 text-xl font-bold align-middle font-roboto">
            {{ $config.title }}</span
          >
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
          <nav class="flex-1 px-2 py-4 space-y-1 bg-gray-200 dark:bg-gray-700">
            <nuxt-link
              v-for="(link, index) in links"
              :key="index"
              :to="link.url"
              class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md dark:text-white dark:hover:text-gray-900 hover:bg-gray-50 hover:text-gray-900 group"
            >
              {{ link.text }}
            </nuxt-link>
          </nav>
        </div>

        <div
          class="flex flex-shrink-0 p-4 bg-gray-200 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
        >
          <nuxt-link
            to="/dashboard"
            class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md dark:text-white dark:hover:text-gray-900 hover:bg-gray-50 hover:text-gray-900 group"
          >
            <fa :icon="['fas', 'arrow-left']" class="w-5 h-5 mr-2 text-lg" />
            Back to Dashboard
          </nuxt-link>
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
