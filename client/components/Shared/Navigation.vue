<template>
  <header id="header" class="dark:bg-gray-700">
    <nav
      class="container mx-auto flex-wrap p-6 flex items-center justify-between"
    >
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <Logo width="40px" height="40px" />
        <span class="font-semibold text-xl tracking-tight">{{ title }}</span>
      </div>
      <div class="block md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
          @click.prevent="toggle"
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
        class="w-full flex-grow md:flex md:items-center md:w-auto md:block"
        :class="open ? 'block' : 'hidden'"
      >
        <ul class="list-reset md:flex justify-end flex-1 items-center">
          <li v-for="(link, text) in links" :key="text" :value="link">
            <a
              href="#responsive-header"
              class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 dark:text-white"
            >
              Docs
            </a>
          </li>
        </ul>
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
import Logo from '@/components/Logo'

export default {
  components: {
    Logo,
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
    return { open: false }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>
