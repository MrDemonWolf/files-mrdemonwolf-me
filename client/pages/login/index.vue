<template>
  <div>
    <div
      class="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8"
    >
      <div
        v-if="!$store.state.login.twoFactorTokenRequested"
        class="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Logo class="w-auto h-12 mx-auto text-primary-500 dark:text-white" />

        <h2
          class="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white font-roboto"
        >
          Sign in to your account
        </h2>
        <p
          v-if="$config.registration"
          class="mt-2 text-sm text-center text-gray-600 max-w dark:text-gray-200 font-roboto"
        >
          Or
          <nuxt-link
            class="font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-roboto"
            to="/signup"
          >
            create a account
          </nuxt-link>
        </p>
        <LoginBasic />
      </div>
      <div
        v-if="$store.state.login.twoFactorTokenRequested"
        class="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Logo class="w-auto h-12 mx-auto" />

        <h2
          class="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white font-roboto"
        >
          Enter your 2FA verification token
        </h2>
        <LoginTwoFactor />
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

  head({ $config: { title } }) {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Already have a ${title} account?  You can login to your current account here.`,
        },
      ],
    }
  },
}
</script>
