<template>
  <div class="text-primary-400 dark:bg-gray-900 dark:text-white font-roboto">
    <div
      class="max-w-screen-xl px-4 py-3 mx-auto sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
    >
      <div class="text-center md:order-1 md:text-left">
        &copy; {{ year }}
        <a
          :href="$config.copyrightLink"
          class="ml-1 text-primary-500 dark:text-gray-400 hover:text-primary-700 dark-hover:text-gray-50"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ $config.copyright }}
        </a>
      </div>

      <div class="flex justify-center mt-2 md:mt-0 md:order-2">
        <nuxt-link
          to="/privacy-policy"
          class="text-primary-500 dark:text-gray-400 hover:text-primary-700 dark-hover:text-gray-50"
          target="_blank"
        >
          Privacy Policy
        </nuxt-link>
        <nuxt-link
          to="/terms-of-service"
          class="ml-4 text-primary-500 dark:text-gray-400 hover:text-primary-700 dark-hover:text-gray-50"
          target="_blank"
        >
          Terms of Service
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>
