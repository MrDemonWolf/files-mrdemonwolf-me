<template>
  <div
    class="container w-full px-2 mx-auto my-0 overflow-auto shadow-md md:px-8 md:my-6 bg-gray-50 lg:w-3/5 dark:bg-gray-200"
  >
    <div class="my-0 sm:my-5">
      <div class="mt-5 md:mt-0">
        <h3 class="text-xl font-bold leading-8 text-gray-900">Security</h3>
        <p class="text-sm leading-5 text-gray-500">Manage account security.</p>
      </div>
      <div class="mt-6 md:mt-3">
        <form @submit.prevent="changeSecurity">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="mb-2 text-base font-medium leading-6 text-gray-900">
                Password Change
              </div>
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="oldPassword"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >Old Password</label
                  >
                  <input
                    id="oldPassword"
                    v-model="changePassword.oldPassword"
                    type="password"
                    :class="{
                      'border-red-500': changePassword.errors.oldPassword,
                    }"
                    class="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                  />
                  <span
                    v-if="changePassword.errors.oldPassword"
                    class="text-red-500"
                    >{{ changePassword.errors.oldPassword }}</span
                  >
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="newPassword"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >New Password</label
                  >
                  <input
                    id="newPassword"
                    v-model="changePassword.newPassword"
                    type="password"
                    :class="{
                      'border-red-500': changePassword.errors.newPassword,
                    }"
                    class="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                  />
                  <span
                    v-if="changePassword.errors.newPassword"
                    class="text-red-500"
                    >{{ changePassword.errors.newPassword }}</span
                  >
                </div>

                <div class="col-span-6">
                  <div class="flex items-center mt-2">
                    <span class="rounded-md">
                      <div
                        class="mb-2 text-base font-medium leading-6 text-gray-900"
                      >
                        Two Factor Authentication
                      </div>

                      <div v-if="!$auth.user.twoFactor">
                        <button
                          type="button"
                          class="px-3 py-2 text-sm font-medium leading-4 text-green-700 transition duration-150 ease-in-out bg-green-200 border border-green-300 rounded-md hover:text-green-500 focus:outline-none focus:border-green-300 focus:ring-blue active:bg-green-50 active:text-green-800"
                          @click.prevent="
                            toggleAccountModalEnableTwoFactorModal
                          "
                        >
                          Enable
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          class="px-3 py-2 text-sm font-medium leading-4 text-red-700 transition duration-150 ease-in-out bg-red-200 border border-red-300 rounded-md hover:text-red-500 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-50 active:text-gray-800"
                          @click.prevent="
                            toggleAccountModalDisableTwoFactorModal
                          "
                        >
                          Disable
                        </button>
                      </div>
                      <p class="mt-2 text-sm text-gray-500">
                        This adds an extra layer of security to your account.
                        This is highy recommended to keep your account
                        recommended
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <portal-target name="AccountModalEnableTwoFactor">
          <transition name="fade">
            <AccountModalEnableTwoFactor
              v-if="$store.state.account.showEnableTwoFactorModal"
            />
            <AccountModalDisableTwoFactor
              v-if="$store.state.account.showDisableTwoFactorModal"
            />
          </transition>
        </portal-target>
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
      changePassword: {
        oldPassword: '',
        newPassword: '',
        errors: { oldPassword: null, newPassword: null },
      },
    }
  },

  methods: {
    async changeSecurity(e) {
      const changePassword =
        !this.$isEmpty(this.changePassword.oldPassword) ||
        !this.$isEmpty(this.changePassword.newPassword)
      if (changePassword) {
        try {
          this.changePassword.errors = { oldPassword: null, newPassword: null }
          const res = await this.$axios.$put('/api/account/change-password', {
            oldPassword: this.changePassword.oldPassword,
            newPassword: this.changePassword.newPassword,
          })
          this.$auth.logout()

          switch (res.code) {
            case 'PASSWORD_CHANGED':
              this.$toast.success(
                'Your password has been changed.  Please login with your new password.',
                {
                  position: 'bottom-right',
                }
              )
              break
            default:
          }
        } catch (e) {
          if (e.response.data.codes) {
            const { oldPassword, newPassword } = e.response.data.codes
            if (oldPassword) {
              switch (oldPassword) {
                case 'REQUIRED':
                  this.changePassword.errors.oldPassword =
                    'Old password is required.'
                  break
                default:
              }
            }
            if (newPassword) {
              switch (newPassword) {
                case 'NOT_LONG_ENOUGH':
                  this.changePassword.errors.newPassword =
                    'New Password must be between 8 and 56 characters long'
                  break
                case 'REQUIRED':
                  this.changePassword.errors.newPassword =
                    'New password is required.'
                  break
                default:
              }
            }
          } else if (e.response.data.code) {
            switch (e.response.data.code) {
              case 'PASSWORD_CONFLICT':
                this.changePassword.errors.newPassword =
                  'New password can not match old password.'
                break
              case 'INVALID_CREDENTIALS':
                this.changePassword.errors.oldPassword = 'Wrong old password.'
                break
              default:
                this.$toast.error('Oops.. Something Went Wrong..', {
                  position: 'bottom-right',
                })
                break
            }
          } else {
            this.$toast.error('Oops.. Something Went Wrong.', {
              position: 'bottom-right',
            })
          }
        }
      }
    },
    async toggleAccountModalEnableTwoFactorModal() {
      await this.$store.dispatch('account/TOGGLE_SHOW_ENABLE_TWO_FACTOR_MODAL')
    },
    async toggleAccountModalDisableTwoFactorModal() {
      await this.$store.dispatch('account/TOGGLE_SHOW_DISABLE_TWO_FACTOR_MODAL')
    },
  },
}
</script>

<style lang="postcss" scoped>
.fade-enter-active {
  @apply duration-150 ease-out;
}
.fade-enter {
  @apply opacity-0;
}
.fade-enter-to {
  @apply opacity-100;
}
.fade-leave-active {
  @apply duration-150 ease-in;
}
.fade-leave {
  @apply opacity-100;
}
.fade-leave-to {
  @apply opacity-0;
}
</style>
