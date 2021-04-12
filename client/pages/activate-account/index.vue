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
        <h1 class="text-3xl font-bold text-center font-roboto text-primary-500">
          Activate Account
        </h1>

        <p class="mt-4 leading-5 font-montserrat">
          Please fill in the email address you used to register. You'll receive
          an email with link to activate your account.
        </p>
        <form class="mt-4" @submit.prevent="userResendActivateAccount">
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
                v-model="resendActivateAccount.email"
                aria-label="Email address"
                name="email"
                type="email"
                :class="{ 'border-red-500': errors.email }"
                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                novalidate
              />
            </div>
            <span v-if="errors.email" class="text-red-500">{{
              errors.email
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['alreadyAuthenticated'],
  data() {
    return {
      resendActivateAccount: {
        email: '',
      },
      error: null,
      errors: { email: null },
      success: null,
    }
  },
  methods: {
    async userResendActivateAccount() {
      try {
        const res = await this.$axios.$post(
          '/api/user/activate-account/resend',
          this.resendActivateAccount
        )
        this.success = res.message
        if (this.error) {
          this.error = null
        }
      } catch (e) {
        this.error = e.res.error
        if (this.success) {
          this.success = null
        }
      }
    },
  },
}
</script>
