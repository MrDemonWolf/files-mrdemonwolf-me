<template>
  <div class="flex flex-col justify-center py-12 h-80 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo class="w-auto h-12 mx-auto text-primary-500 dark:text-white" />

      <h1
        class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900 dark:text-white"
      >
        Reset your password
      </h1>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <SharedAlert v-if="error" type="danger" :message="error" class="mb-4" />
      <SharedAlert
        v-if="success"
        type="success"
        :message="`${success} You will be redirected in a few moments....`"
        class="mb-4"
      />
      <div
        class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-gray-200"
      >
        <form @submit.prevent="userResetPassword">
          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-800"
            >
              Password
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                v-model="resetPassword.password"
                aria-label="Password"
                name="password"
                type="password"
                :class="{ 'border-red-500': resetPassword.errors.password }"
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                novalidate
              />
            </div>
            <span v-if="resetPassword.errors.password" class="text-red-500">{{
              resetPassword.errors.password
            }}</span>
          </div>

          <div class="mt-6">
            <label
              for="comfirmPassword"
              class="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-800"
            >
              Comfirm Password
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="comfirmPassword"
                v-model="resetPassword.comfirmPassword"
                aria-label="Comfirm Password"
                name="comfirmPassword"
                type="password"
                :class="{
                  'border-red-500': resetPassword.errors.comfirmPassword,
                }"
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                novalidate
              />
            </div>
            <span
              v-if="resetPassword.errors.comfirmPassword"
              class="text-red-500"
              >{{ resetPassword.errors.comfirmPassword }}</span
            >
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
              >
                Change Password
              </button>
            </span>
          </div>
        </form>
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
      resetPassword: {
        password: '',
        comfirmPassword: '',
        errors: { password: null, comfirmPassword: null },
      },
      error: null,
      success: null,
    }
  },
  methods: {
    async userResetPassword() {
      try {
        this.error = null
        this.success = null
        this.resetPassword.errors.password = null
        this.resetPassword.errors.comfirmPassword = null

        const res = await this.$axios.$post(
          `/api/user/reset-password/${this.$route.params.token}`,
          {
            password: this.resetPassword.password,
            comfirmPassword: this.resetPassword.comfirmPassword,
          }
        )
        this.success = res.message

        setTimeout(() => this.$router.push({ path: '/login' }), 1000 * 5)
      } catch (e) {
        this.error = null
        this.success = null
        this.resetPassword.errors.password = null
        this.resetPassword.errors.comfirmPassword = null
        if (e.response.data.codes) {
          const { password, comfirmPassword } = e.response.data.codes
          if (password) {
            switch (password) {
              case 'REQUIRED':
                this.resetPassword.errors.password = 'Password is required.'
                break
              case 'NOT_LONG_ENOUGH':
                this.resetPassword.errors.password =
                  'Password must be between 8 and 56 characters long'
                break
              case 'NO_MATCH':
                this.resetPassword.errors.password =
                  'Both passwords must match.'
                break
              default:
            }
          }
          if (comfirmPassword) {
            switch (comfirmPassword) {
              case 'MUST_CONFIRM':
                this.resetPassword.errors.comfirmPassword =
                  'You must comfirm your new password.'
                break
              case 'NO_MATCH':
                this.resetPassword.errors.comfirmPassword =
                  'Both passwords must match.'
                break

              default:
            }
          }
        }
      }
    },
  },
}
</script>
