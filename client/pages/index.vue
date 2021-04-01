,
<template>
  <div
    class="relative flex flex-col min-h-screen overflow-hidden bg-gray-200 dark:bg-gray-900"
  >
    <div
      class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
      aria-hidden="true"
    >
      <div class="relative h-full mx-auto max-w-7xl">
        <svg
          class="absolute transform right-full translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-primary-500 dark:text-gray-200"
                fill="currentColor"
              ></rect>
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
          ></rect>
        </svg>
        <svg
          class="absolute transform left-full -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-primary-500 dark:text-gray-200"
                fill="currentColor"
              ></rect>
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
          ></rect>
        </svg>
      </div>
    </div>

    <div class="relative flex-grow pt-6 pb-16 sm:pb-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6">
        <nav
          class="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div
            class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0"
          >
            <div class="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <Logo
                  class="w-auto h-8 sm:h-10 text-primary-500 dark:text-white"
                />
              </a>
              <div class="flex items-center -mr-2 md:hidden">
                <button
                  id="main-menu"
                  class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  x-bind:aria-expanded="open"
                  aria-haspopup="true"
                  type="button"
                  @click="mobileNavActive = true"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    x-description="Heroicon name: outline/menu"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:space-x-10">
            <nuxt-link
              v-for="(link, index) in links"
              :key="index"
              :to="link.url"
              class="font-medium text-gray-500 hover:text-gray-900"
              >{{ link.tet }}</nuxt-link
            >
          </div>
          <div
            class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
          >
            <span class="inline-flex rounded-md shadow">
              <a
                href="#"
                class="inline-flex items-center px-4 py-2 text-base font-medium bg-white border border-transparent rounded-md text-primary-600 hover:bg-gray-50"
              >
                Log in
              </a>
            </span>
          </div>
        </nav>
      </div>

      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
        ><div
          v-if="mobileNavActive"
          class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
          x-description="Mobile menu, show/hide based on menu open state."
        >
          <div
            class="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
          >
            <div class="flex items-center justify-between px-5 pt-4">
              <div>
                <Logo
                  class="w-auto h-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-primary-600.svg"
                />
              </div>
              <div class="-mr-2">
                <button
                  class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  type="button"
                  @click="mobileNavActive = false"
                >
                  <span class="sr-only">Close menu</span>
                  <svg
                    class="w-6 h-6"
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
            </div>
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div class="px-2 pt-2 pb-3" role="none">
                <a
                  href="#"
                  class="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                  >Product</a
                >
              </div>
              <div role="none">
                <a
                  href="#"
                  class="block w-full px-5 py-3 font-medium text-center text-primary-600 bg-gray-50 hover:bg-gray-100"
                  role="menuitem"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div></transition
      >

      <main class="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl md:text-6xl"
          >
            <span class="block xl:inline">Be able to</span>
            <!-- space -->
            <span class="block text-primary-600 dark:text-primary-400 xl:inline"
              >share</span
            >
          </h1>
          <p
            class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl dark:text-gray-200"
          >
            {{ $config.landing.description }}
          </p>
          <div class="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <nuxt-link
                to="/signup"
                class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </nuxt-link>
            </div>
            <div
              v-if="$config.landing.button.enabled"
              class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
            >
              <a
                :href="$config.landing.button.url"
                class="flex items-center justify-center w-full px-8 py-3 text-base font-medium bg-white border border-transparent rounded-md text-primary-600 hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                {{ $config.landing.button.text }}
              </a>
            </div>
          </div>
        </div>
        <div class="relative pt-10">
          <div class="px-4 mx-auto max-w-7xl sm:px-6">
            <img
              class="relative rounded-lg shadow-lg"
              src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
              alt="App screenshot"
            />
          </div>
        </div>
      </main>
    </div>
    <footer
      class="z-0 bg-white dark:bg-gray-800"
      aria-labelledby="footerHeading"
    >
      <h2 id="footerHeading" class="sr-only">Footer</h2>
      <div
        class="px-4 py-6 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
      >
        <div class="flex justify-center space-x-6 md:order-2">
          <button
            type="button"
            aria-label="Color Theme"
            class="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium leading-4 text-gray-500 border border-transparent rounded-md shadow-sm bg-primary-100 hover:bg-primary-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            @click="
              $colorMode.value === 'dark'
                ? ($colorMode.preference = 'light')
                : ($colorMode.preference = 'dark')
            "
          >
            <fa
              v-if="$colorMode.value === 'dark'"
              :icon="['fas', 'sun']"
              class="w-4 h-4 text-xl align-middle"
            />
            <fa
              v-else
              :icon="['far', 'moon']"
              class="w-4 h-4 text-xl align-middle"
            />
          </button>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-base text-center text-gray-400 dark:text-gray-200">
            &copy; {{ year }}
            <a class="font-bold" :href="$config.copyrightLink">{{
              $config.copyright
            }}</a
            >. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from '@/assets/vectors/logo.svg?inline'

export default {
  components: { Logo },
  layout: 'landing',

  data: () => ({
    mobileNavActive: false,
    year: new Date().getFullYear(),
    links: [],
  }),

  methods: {
    mobileNavToggle() {
      this.mobileNavActive = !this.mobileNavActive
    },
  },
}
</script>
