<template>
  <div
    class="relative flex-grow h-screen overflow-hidden bg-primary-50 dark:bg-gray-800"
  >
    <div class="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
      <svg
        class="absolute bottom-0 right-0 mb-48 transform translate-x-1/2 text-primary-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
        width="364"
        height="384"
        viewBox="0 0 364 384"
        fill="none"
      >
        <defs>
          <pattern
            id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="364"
          height="384"
          fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
        ></rect>
      </svg>
    </div>
    <div class="relative pt-6 pb-16 sm:pb-24">
      <Navigation :links="links" />

      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <MobileNavigation :links="links" />
      </transition>

      <main class="mx-2 mt-16 sm:mx-12 sm:mt-32">
        <div class="mx-auto max-w-7xl">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div
              class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
            >
              <div>
                <h1
                  class="mt-4 text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl"
                >
                  <span class="md:block">Built to enrich your</span>
                  <span class="text-primary-500 md:block">sharing</span>
                </h1>
                <p
                  class="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  {{ $config.description }}
                </p>
              </div>
            </div>
            <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div
                class="bg-white dark:bg-gray-100 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
              >
                <div class="px-4 py-8 mt-6 sm:px-10">
                  <form action="#" method="POST" class="space-y-6">
                    <div>
                      <label for="name" class="sr-only">Full name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        autocomplete="name"
                        placeholder="Full name"
                        required=""
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label for="email" class="sr-only">Email</label>
                      <input
                        id="email"
                        type="text"
                        name="email"
                        autocomplete="email"
                        placeholder="Email"
                        required=""
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label for="password" class="sr-only">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                        required=""
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <button
                        class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm dark:text-black bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Create your account
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="px-4 py-6 border-t-2 border-primary-100 bg-primary-200 sm:px-10 dark:bg-gray-200 dark:border-gray-100"
                >
                  <p class="text-xs leading-5 text-gray-600 dark:text-gray-800">
                    By signing up, you agree to our
                    <a
                      href="#"
                      class="font-medium text-gray-900 dark:text-black hover:underline"
                      >Terms</a
                    >,
                    <a
                      href="#"
                      class="font-medium text-gray-900 dark:text-black hover:underline"
                      >Data Policy</a
                    >
                    and
                    <a
                      href="#"
                      class="font-medium text-gray-900 dark:text-black hover:underline"
                      >Cookies Policy</a
                    >.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>Color mode: {{ $colorMode.value }}</h1>
          <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Landing/Navigation'
import MobileNavigation from '@/components/Landing/MobileNavigation'

export default {
  components: {
    Navigation,
    MobileNavigation,
  },
  data() {
    return {
      isRegister: process.env.REGISTRATION || true,
      register: {
        email: '',
        username: '',
        password: '',
      },
      links: [
        {
          url: '/example',
          text: 'Example',
        },
        {
          url: '/example2',
          text: 'Example 2',
        },
        {
          url: '/example 3',
          text: 'Example 3',
        },
        {
          url: '/example4',
          text: 'Example 4',
        },
      ],
      errors: { username: null, email: null, password: null },
      error: null,
      success: null,
    }
  },
}
</script>
