<template>
  <div class="flex flex-col justify-center py-12 h-80 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-gray-200"
      >
        <div class="text-center">
          <SharedCircleLoaderCheckmark
            :success="loader.success"
            :loading="loader.loading"
          />
        </div>
        <h1
          class="mt-8 text-3xl font-bold text-center font-roboto text-primary-500"
        >
          Email Confirmation
        </h1>

        <p v-if="!loader.loading" class="mt-4 leading-5 font-montserrat">
          {{ loader.message }}
        </p>
        <div class="mt-6">
          <div v-if="loader.success" class="text-sm leading-5">
            <nuxt-link
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
              to="/login"
            >
              Login
            </nuxt-link>
          </div>
          <div v-else class="text-sm leading-5">
            <nuxt-link
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700"
              to="/activate-account"
            >
              Resend activation link?
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['alreadyAuthenticated'],
  data() {
    return {
      loader: {
        success: null,
        message: '',
        loading: true,
      },
    }
  },
  mounted() {
    this.userActivateAccount()
  },
  methods: {
    async userActivateAccount() {
      try {
        const res = await this.$axios.$put(
          `/api/user/activate-account/${this.$route.params.token}`
        )
        this.loader.success = true
        this.loader.message = res.message
        this.loader.loading = false
      } catch (e) {
        this.success = false
        this.loader.message = e.response.data.error
        this.loader.loading = false
      }
    },
  },
}
</script>
