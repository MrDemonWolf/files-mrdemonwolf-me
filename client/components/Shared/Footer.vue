<template>
  <footer class="text-gray-700 body-font">
    <div
      class="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col"
    >
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
        &copy; {{ year }}
        <a
          :href="copyrightLink"
          class="text-gray-600 ml-1"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ copyright }}
        </a>
      </p>
      <span
        class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"
      >
        <a class="text-gray-500">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
            ></path>
          </svg>
        </a>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      copyright: 'MrDemonWolf',
      copyrightLink: 'https://www.mrdemonwolf.me',
    }
  },
}
</script>
