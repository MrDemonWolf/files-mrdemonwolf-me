<template>
  <div class="relative overflow-hidden bg-primary-200 dark:bg-primary-800">
    <div class="hidden sm:block sm:absolute sm:inset-0">
      <svg
        class="absolute bottom-0 right-0 mb-48 text-gray-800 transform translate-x-1/2 dark:text-white lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
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
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="364"
          height="384"
          fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
        />
      </svg>
    </div>
    <div class="relative pt-6 pb-12 sm:pb-32">
      <nav
        class="relative flex items-center justify-between max-w-screen-xl px-4 mx-auto sm:px-6"
      >
        <div class="flex items-center flex-1">
          <div class="flex items-center justify-between w-full md:w-auto">
            <nuxt-link to="/" aria-label="Home">
              <Logo
                class="w-auto h-10 text-primary-500 dark:text-primary-400 sm:h-10"
                alt="Logo"
              />
            </nuxt-link>
            <div class="flex items-center -mr-2 md:hidden">
              <button
                id="main-menu"
                type="button"
                class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                aria-label="Main menu"
                aria-haspopup="true"
              >
                <svg
                  class="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="hidden space-x-10 md:flex md:ml-10">
            <a
              href="#"
              class="font-medium text-gray-800 transition duration-150 ease-in-out dark:text-white hover:text-gray-500"
              >Product</a
            >
            <a
              href="#"
              class="font-medium text-gray-800 transition duration-150 ease-in-out dark:text-white hover:text-gray-500"
              >Features</a
            >
            <a
              href="#"
              class="font-medium text-gray-800 transition duration-150 ease-in-out dark:text-white hover:text-gray-500"
              >Marketplace</a
            >
            <a
              href="#"
              class="font-medium text-gray-800 transition duration-150 ease-in-out dark:text-white hover:text-gray-500"
              >Company</a
            >
          </div>
        </div>
        <div class="hidden md:flex">
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700"
          >
            Log in
          </a>
        </div>
      </nav>

      <!--
      Entering: "duration-150 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
      <div
        class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
      >
        <div class="rounded-lg shadow-md">
          <div
            class="overflow-hidden bg-white rounded-lg shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu"
          >
            <div class="flex items-center justify-between px-5 pt-4">
              <div>
                <img
                  class="w-auto h-8"
                  src="/img/logos/workflow-mark-on-white.svg"
                  alt=""
                />
              </div>
              <div class="-mr-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                  aria-label="Close menu"
                >
                  <svg
                    class="w-6 h-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                role="menuitem"
                >Product</a
              >
              <a
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                role="menuitem"
                >Features</a
              >
              <a
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                role="menuitem"
                >Marketplace</a
              >
              <a
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                role="menuitem"
                >Company</a
              >
            </div>
            <div>
              <a
                href="#"
                class="block w-full px-5 py-3 font-medium text-center text-indigo-600 transition duration-150 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700"
                role="menuitem"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      <main class="mt-8 sm:mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-screen-xl mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div
              class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
            >
              <div>
                <h2
                  class="mt-4 text-4xl font-extrabold leading-10 tracking-tight text-gray-800 dark:text-white sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl"
                >
                  Be able to
                  <br class="hidden md:inline" />
                  <span class="text-primary-500 dark:text-primary-400"
                    >Share</span
                  >
                </h2>
                <p
                  class="mt-3 text-base text-gray-500 dark:text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  {{ $config.description }}
                </p>
              </div>
            </div>
            <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
              <div
                class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden"
              >
                <div class="px-4 py-8 sm:px-10">
                  <div>
                    <p class="text-sm font-medium leading-5 text-gray-700">
                      Sign in with
                    </p>

                    <div class="grid grid-cols-3 gap-3 mt-1">
                      <div>
                        <span class="inline-flex w-full rounded-md shadow-sm">
                          <button
                            type="button"
                            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                            aria-label="Sign in with Facebook"
                          >
                            <svg
                              class="h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>

                      <div>
                        <span class="inline-flex w-full rounded-md shadow-sm">
                          <button
                            type="button"
                            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                            aria-label="Sign in with Twitter"
                          >
                            <svg
                              class="h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>

                      <div>
                        <span class="inline-flex w-full rounded-md shadow-sm">
                          <button
                            type="button"
                            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                            aria-label="Sign in with GitHub"
                          >
                            <svg
                              class="h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="relative mt-6">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm leading-5">
                      <span class="px-2 text-gray-500 bg-white"> Or </span>
                    </div>
                  </div>

                  <div class="mt-6">
                    <form action="#" method="POST" class="space-y-6">
                      <div>
                        <label for="name" class="sr-only"> Full name </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="name"
                            placeholder="Full name"
                            required
                            class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>

                      <div>
                        <label for="mobile-or-email" class="sr-only">
                          Mobile number or email
                        </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="mobile-or-email"
                            placeholder="Mobile number or email"
                            required
                            class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>

                      <div>
                        <label for="password" class="sr-only"> Password </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>

                      <div>
                        <span class="block w-full rounded-md shadow-sm">
                          <button
                            type="submit"
                            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                          >
                            Create your account
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  class="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10"
                >
                  <p class="text-xs leading-5 text-gray-500">
                    By signing up, you agree to our
                    <a
                      href="#"
                      class="font-medium text-gray-900 hover:underline"
                      >Terms</a
                    >,
                    <a
                      href="#"
                      class="font-medium text-gray-900 hover:underline"
                      >Data Policy</a
                    >
                    and
                    <a
                      href="#"
                      class="font-medium text-gray-900 hover:underline"
                      >Cookies Policy</a
                    >.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/vectors/logo.svg?inline'

export default {
  components: {
    Logo,
  },
  data() {
    return {
      isRegister: process.env.REGISTRATION || true,
      register: {
        email: '',
        username: '',
        password: '',
      },
      errors: { username: null, email: null, password: null },
      error: null,
      success: null,
    }
  },
}
</script>
