<template>
  <div
    class="container w-full px-2 mx-auto my-0 overflow-auto shadow-md md:px-8 md:my-6 bg-gray-50 lg:w-9/12 dark:bg-gray-200"
  >
    <div class="my-0 sm:my-5">
      <div class="mt-5 md:mt-0">
        <h3 class="text-xl font-bold leading-8 text-gray-900">Profile</h3>
        <p class="text-sm leading-5 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div class="mt-6 md:mt-3">
        <form @submit.prevent="changeProfileInformation">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <label
                for="username"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Username
              </label>
              <div class="flex mt-1 rounded-md shadow-sm">
                <input
                  id="username"
                  v-model="changeUsername.username"
                  :class="{
                    'border-red-500': changeUsername.errors.username,
                  }"
                  class="flex-1 block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
              </div>
              <span
                v-if="changeUsername.errors.username"
                class="text-red-500"
                >{{ changeUsername.errors.username }}</span
              >
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <span class="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',

  middleware: ['auth'],

  data() {
    return {
      changeUsername: {
        username: this.$auth.user.username,
        errors: { username: null },
      },
    }
  },

  methods: {
    async changeProfileInformation(e) {
      const changeUsername =
        this.$auth.user.username !== this.changeUsername.username

      if (changeUsername) {
        try {
          const res = await this.$axios.$put('/api/account/change-username', {
            username: this.changeUsername.username,
          })
          await this.$auth.fetchUser()

          switch (res.code) {
            case 'USERNAME_CHANGED':
              this.$toast.success(
                `Your username has been changed to ${this.$auth.user.username}.`,
                {
                  position: 'bottom-right',
                }
              )
              break
            default:
              break
          }
        } catch (e) {
          if (e.response.data.codes) {
            const { username } = e.response.data.codes
            if (username) {
              switch (username) {
                case 'REQUIRED':
                  this.changeUsername.errors.username = 'Username is required.'
                  break
                case 'INVALID_CHARACTERS':
                  this.changeUsername.errors.username =
                    'Username is invalid. Must only contain numbers or letters.'
                  break
                case 'NOT_LONG_ENOUGH':
                  this.changeUsername.errors.username =
                    'Username must be between 3 and 28 characters long.'
                  break
                default:
                  this.$toast.error('Oops.. Something Went Wrong.', {
                    position: 'bottom-right',
                  })
                  break
              }
            }
          } else {
            switch (e.response.data.code) {
              case 'USERNAME_CONFLICT':
                this.changeUsername.errors.username = `${this.changeUsername.username} is currently not available.`
                break
              default:
                this.$toast.error('Oops.. Something Went Wrong..', {
                  position: 'bottom-right',
                })
                break
            }
          }
        }
      }
    },
  },
}
</script>
