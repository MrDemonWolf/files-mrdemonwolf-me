<template>
  <div>
    <div class="mt-5 md:mt-0">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Security</h3>
      <p class="text-sm leading-5 text-gray-500">Manage account security</p>
    </div>
    <div class="mt-6 md:mt-3">
      <Alert v-if="error" type="danger" :message="error" class="mb-4" />
      <form @submit.prevent="changeSecurity">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="mb-2 text-base font-medium leading-6 text-gray-900">
              Passowrd Change
            </div>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first_name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Old Password</label
                >
                <input
                  v-model="changePassword.oldPassword"
                  type="password"
                  :class="{
                    'border-red-500': changePassword.errors.oldPassword,
                  }"
                  class="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
                <span
                  v-if="changePassword.errors.oldPassword"
                  class="text-red-500"
                  >{{ changePassword.errors.oldPassword }}</span
                >
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last_name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >New Password</label
                >
                <input
                  v-model="changePassword.newPassword"
                  type="password"
                  :class="{
                    'border-red-500': changePassword.errors.newPassword,
                  }"
                  class="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
                <span
                  v-if="changePassword.errors.newPassword"
                  class="text-red-500"
                  >{{ changePassword.errors.newPassword }}</span
                >
              </div>
            </div>
          </div>
          <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              class="px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-400 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Shared/Alert'

export default {
  components: { Alert },
  data() {
    return {
      changePassword: {
        oldPassword: '',
        newPassword: '',
        device: {
          os: '',
          browser: '',
        },
        errors: { oldPassword: null, newPassword: null },
      },
      error: null,
      success: null,
    }
  },
  methods: {
    async changeSecurity(e) {
      try {
        if (
          this.changePassword.oldPassword === '' &&
          this.changePassword.newPassword === ''
        ) {
          return this.$toast.info('No Security Information has been changed.', {
            position: 'bottom-right',
          })
        }
        this.changePassword.device = {
          os: this.$ua.os(),
          browser: this.$ua.browser(),
        }
        const response = await this.$axios.put(
          '/api/account/change-password',
          this.changePassword
        )
        this.$auth.logout()

        this.$toast.success(response.data.message, {
          position: 'bottom-right',
        })
      } catch (e) {
        if (e.response && e.response.data && e.response.data.errors) {
          this.changePassword.errors = e.response.data.errors
        } else {
          this.$toast.error('Oops.. Something Went Wrong..', {
            position: 'bottom-right',
          })
        }
      }
    },
  },
}
</script>
