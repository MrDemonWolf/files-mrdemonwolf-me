<template>
  <div class="h-80 flex items-center justify-center bg-gray-50 py-12">
    <div class="max-w-md w-full">
      <div>
        <h2
          class="mt-6 text-center text-3xl leading-9 font-extrabold text-blue-900 dark:text-white"
        >
          Login in to your account
        </h2>
        <p
          class="mt-2 text-center text-sm leading-5 text-gray-600 dark:text-white"
        >
          Or
          <nuxt-link
            class="ont-bold text-indigo-600 dark:text-blue-300 hover:text-indigo-500 transition ease-in-out duration-150"
            to="/register"
          >
            register for a account
          </nuxt-link>
        </p>
      </div>
      <form class="bg-gray-100 mt-8 p-16">
        <input
          class="rounded-md shadow-sm mb-1"
          type="hidden"
          name="remember"
          value="true"
        />
        <div class="mb-3">
          <input
            aria-label="Email address"
            name="email"
            type="email"
            class="iinline-block w-full px-3 py-2 rounded border border-gray-400 focus:border-blue-500 bg-white text-gray-900 appearance-nonerounded focus:outline-none"
            placeholder="Email address"
            required
          />
        </div>
        <div class="mb-3">
          <input
            aria-label="Password"
            name="password"
            type="password"
            class="inline-block w-full px-3 py-2 rounded border border-gray-400 focus:border-blue-500 bg-white text-gray-900 appearance-nonerounded focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              for="remember_me"
              class="ml-2 block text-sm leading-5 text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm leading-5">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
