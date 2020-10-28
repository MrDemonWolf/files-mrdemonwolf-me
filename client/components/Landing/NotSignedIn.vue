<template>
  <div class="relative overflow-hidden bg-gray-800 h-85 lg:h-85 md:h-90">
    <div class="hidden sm:block sm:absolute sm:inset-0">
      <svg
        class="absolute bottom-0 right-0 mb-48 text-gray-700 transform translate-x-1/2 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
        width="450"
        height="450"
        viewBox="0 0 450 450"
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
          width="450"
          height="450"
          fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
        />
      </svg>
    </div>
    <div class="relative pt-6 pb-12 md:pt-12 sm:pb-32">
      <div class="mt-16 sm:mt-8 md:mt-6 lg:mt-24">
        <div class="max-w-screen-xl mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-8">
            <div
              class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center"
            >
              <div>
                <h1
                  class="mt-4 text-4xl font-extrabold leading-10 tracking-tight text-white sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl font-roboto"
                >
                  Be able to
                  <br class="hidden md:inline" />
                  <span class="text-primary-400"> share</span>
                </h1>
                <p
                  class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  Let the Share take all the content you want to let friends,
                  family, and anyone else see. Such as Images,Files, and even
                  Links.
                </p>
              </div>
            </div>
            <div
              v-if="$config.registration"
              class="mt-12 sm:mt-14 lg:mt-0 lg:col-span-6"
            >
              <div
                class="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden dark:bg-gray-300"
              >
                <div class="px-4 py-8 sm:px-10">
                  <div class="mt-6">
                    <Alert
                      v-if="success"
                      type="success"
                      :message="success"
                      class="mb-4"
                    />
                    <Alert
                      v-if="error"
                      type="danger"
                      :message="error"
                      class="mb-4"
                    />
                    <form class="space-y-6" @submit.prevent="userRegister">
                      <div>
                        <label for="username" class="sr-only"> Username </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="username"
                            v-model="register.username"
                            aria-label="Username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            :class="{ 'border-red-500': errors.username }"
                            class="block w-full px-3 py-2 mt-1 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            novalidate
                          />
                        </div>
                        <span v-if="errors.username" class="text-red-500">{{
                          errors.username
                        }}</span>
                      </div>

                      <div>
                        <label for="email" class="sr-only"> Email </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="email"
                            v-model="register.email"
                            aria-label="Email address"
                            name="email"
                            type="email"
                            :class="{ 'border-red-500': errors.email }"
                            placeholder="Email"
                            class="block w-full px-3 py-2 mt-1 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            novalidate
                          />
                        </div>
                        <span v-if="errors.email" class="text-red-500">{{
                          errors.email
                        }}</span>
                      </div>

                      <div>
                        <label for="password" class="sr-only"> Password </label>
                        <div class="rounded-md shadow-sm">
                          <input
                            id="password"
                            v-model="register.password"
                            aria-label="Password"
                            name="password"
                            type="password"
                            :class="{ 'border-red-500': errors.password }"
                            placeholder="Password"
                            class="block w-full px-3 py-2 mt-1 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            novalidate
                          />
                        </div>
                        <span v-if="errors.password" class="text-red-500">{{
                          errors.password
                        }}</span>
                      </div>

                      <div>
                        <span class="block w-full rounded-md shadow-sm">
                          <button
                            type="submit"
                            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-500 hover:bg-primary-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                          >
                            Create your account
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  class="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10 dark:bg-gray-50 dark:border-gray-200"
                >
                  <p class="text-xs leading-5 text-gray-500 dark:text-black">
                    By signing up, you agree to our
                    <nuxt-link
                      to="/terms-of-service"
                      class="font-medium text-gray-900"
                      target="_blank"
                    >
                      Terms of Service
                    </nuxt-link>
                    and
                    <nuxt-link
                      to="/privacy-policy"
                      class="font-medium text-gray-900"
                      target="_blank"
                    >
                      Privacy Policy </nuxt-link
                    >.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Shared/Alert'

export default {
  components: { Alert },
  data() {
    return {
      isRegister: true,
      register: {
        email: '',
        username: '',
        password: '',
      },
      error: null,
      errors: { username: null, email: null, password: null },
      success: null,
    }
  },
  methods: {
    async userRegister() {
      try {
        const response = await this.$axios.post('/api/auth/register', {
          username: this.register.username,
          email: this.register.email,
          password: this.register.password,
        })
        this.success = response.data.message
        if (this.error) {
          this.error = null
        }
      } catch (e) {
        if (e.response.data.errors) {
          return (this.errors = e.response.data.errors)
        }
        this.error = e.response.data.error
        if (this.success) {
          this.success = null
        }
      }
    },
  },
}
</script>
