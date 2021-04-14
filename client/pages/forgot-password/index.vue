<template>
  <div class="flex flex-col justify-center py-12 h-80 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <SharedAlert v-if="error" type="danger" :message="error" class="mb-4" />
      <SharedAlert
        v-if="success"
        type="success"
        :message="success"
        class="mb-4"
      />
      <div
        class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-gray-200"
      >
        <Logo class="w-auto h-12 mx-auto text-primary-500 dark:text-white" />

        <h1 class="text-3xl font-bold text-center font-roboto text-primary-500">
          Forgot Password
        </h1>

        <p class="mt-4 leading-5 font-montserrat">
          Please fill in the email address you used to register. You'll receive
          an email with instructions on how to reset your password.
        </p>
        <form class="mt-4" @submit.prevent="userForgotPassword">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-800"
            >
              Email
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="email"
                v-model="forgotPassword.email"
                aria-label="Email address"
                name="email"
                type="email"
                :class="{ 'border-red-500': forgotPassword.errors.email }"
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                novalidate
              />
            </div>
            <span v-if="forgotPassword.errors.email" class="text-red-500">{{
              forgotPassword.errors.email
            }}</span>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
              >
                Submit
              </button>
            </span>
          </div>
        </form>
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm leading-5">
            Remembered your password?
            <nuxt-link
              class="font-medium transition duration-150 ease-in-out text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
              to="/login"
            >
              Sign in here
            </nuxt-link>
          </div>
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

  middleware: ['alreadyAuthenticated'],
  data() {
    return {
      forgotPassword: {
        email: '',
        errors: {
          email: null,
        },
      },
      error: null,
      success: null,
    }
  },
  methods: {
    async userForgotPassword() {
      try {
        this.success = null
        this.error = null
        await this.$axios.$post('/api/user/forgot-password/', {
          email: this.forgotPassword.email,
        })
        this.success =
          'An Email has been sent to your email with further instructions on how to reset your password. Please check your email account.'
      } catch (e) {
        this.success = null
        this.error = null

        if (e.response.data.codes) {
          const { email } = e.response.data.codes
          if (email) {
            switch (email) {
              case 'INVALID':
                this.forgotPassword.errors.email = 'Email is invalid.'
                break
              case 'REQUIRED':
                this.forgotPassword.errors.email = 'Email is required.'
                break
              default:
                break
            }
          }
          return
        }

        if (e.response.data.code) {
          switch (e.response.data.code) {
            case 'NON_EXISTENT':
              this.error = 'There is no account with that email.'
              break
            case 429:
              this.error =
                'You either requested or changed your password recently.  Please try again later.'
              break
            default:
              break
          }
          return
        }

        this.error = 'Oops.. Something Went Wrong..'
      }
    },
  },
}
</script>
