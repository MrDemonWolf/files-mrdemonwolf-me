<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-primary-50 dark:bg-gray-800 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo
        class="w-auto h-16 mx-auto text-primary-500 dark:text-white"
        :alt="`${$config.title} Logo`"
      />
      <h2
        class="mt-6 text-3xl font-extrabold text-center text-gray-800 dark:text-white"
      >
        Sign in to your account
      </h2>
      <p
        class="mt-2 text-sm text-center text-gray-600 dark:text-gray-100 max-w"
      >
        Or
        <a href="#" class="font-medium text-primary-500 hover:text-primary-400">
          start your 14-day free trial
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="px-4 py-8 bg-white shadow dark:bg-gray-100 sm:rounded-lg sm:px-10"
      >
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <label for="remember_me" class="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign in
            </button>
          </div>
        </form>
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
      login: {
        email: '',
        password: '',
      },
      errors: { username: null, email: null, password: null },
      error: null,
      success: null,
    }
  },
}
</script>
