<template>
  <div
    role="dialog"
    aria-modal="true"
    class="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <div class="fixed inset-0">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div
      class="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full"
      @click.stop
    >
      <LoadingOverlay
        :active.sync="loader.isLoading"
        :can-cancel="loader.canCancel"
        :color="loader.color"
        :background-color="loader.bgColor"
        :height="loader.height"
        :width="loader.width"
        :is-full-page="loader.fullPage"
      />
      <form @submit.prevent="userEnableTwoFactor">
        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <fa :icon="['fas', 'lock']" class="w-6 h-6 text-primary-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div>
                <h3 class="text-xl font-medium leading-6 text-primary-500">
                  Initialize Two Factor
                </h3>
              </div>

              <div class="my-3">
                <label
                  for="backupCodes"
                  class="block my-2 text-sm font-medium leading-5 text-gray-700"
                >
                  1. Download your backup codes and save them to a safe place.
                </label>

                <div
                  class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-1 md:-mx-1"
                >
                  <div
                    v-for="(backupCode, index) in $store.state.account
                      .twoFactorBackupCodes"
                    :key="index"
                    :class="{
                      'bg-gray-100': index % 2 === 0,
                      'bg-gray-200': index % 2 !== 0,
                    }"
                    class="w-1/2 p-3 px-2 my-2 overflow-hidden font-semibold text-center text-black sm:my-1 sm:px-1 sm:w-1/2 md:my-1 md:px-1 md:w-1/2 lg:w-1/2"
                  >
                    {{ backupCode }}
                  </div>
                </div>
                <button
                  type="button"
                  class="w-full px-4 py-2 my-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring sm:text-sm sm:leading-5"
                  @click.prevent="downloadTwoFactorBackupCodes"
                >
                  Download {{ $config.title | lowercase }}-backup-codes.txt
                </button>
              </div>

              <div class="my-3">
                <label
                  for="backupCodes"
                  class="block my-2 text-sm font-medium leading-5 text-gray-700"
                >
                  2. Scan this QR Code with Google Authenticator (or any
                  supported authenticator apps.) or click
                  <span class="font-semi-bold">show key</span> below to setup
                  manually .
                </label>
                <img class="w-32" :src="$store.state.account.twoFactorQrCode" />
                <div class="flex mt-1 rounded-md">
                  <button
                    class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring sm:text-sm sm:leading-"
                    @click.prevent="toggleTwoFactorSecret"
                  >
                    Show Key
                  </button>
                  <div class="relative flex-grow ml-2 focus-within:z-10">
                    <span
                      v-if="showTwoFactorSecret"
                      class="block w-full transition duration-150 ease-in-out rounded-none form-input sm:text-sm sm:leading-5"
                    >
                      {{ $store.state.account.twoFactorSecret }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="my-3">
                <label
                  for="twoFactorCode"
                  class="block my-2 text-sm font-medium leading-5 text-gray-700"
                >
                  3. Verify two factor code. Before two factor can be enabled
                  you must verify.
                </label>
                <input
                  id="twoFactorCode"
                  v-model="twoFactor.code"
                  type="text"
                  :class="{
                    'border-red-500': $store.state.account.messages.error,
                  }"
                  class="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:ring-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
                <span
                  v-if="$store.state.account.messages.error"
                  class="text-red-500"
                  >{{ $store.state.account.messages.error }}</span
                >
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="submit"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border rounded-md order-transparent bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring"
              >
                Enable
              </button>
            </span>
            <span
              class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring sm:text-sm sm:leading-5"
                @click="toggleTwoFactorModal"
                @keydown.esc="hideTwoFactorModal"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: {
        isLoading: true,
        canCancel: false,
        fullPage: false,
        color: '#486EC2',
        bgColor: '#ffffff',
        height: 64,
        width: 64,
      },
      twoFactor: {
        code: '',
        errors: {
          code: null,
        },
      },
      showTwoFactorSecret: false,
    }
  },
  async mounted() {
    /**
     * Adding data to modal
     */
    try {
      await this.$store.dispatch('account/SET_TWO_FACTOR_INITIALIZE')
    } catch (e) {
      this.hideTwoFactorModal()
      return this.$toast.error('Oops.. Something Went Wrong..', {
        position: 'bottom-right',
      })
    }

    this.popupItem = this.$refs.background

    const close = (e) => {
      const ESC = 27
      if (e.keyCode !== ESC) return
      this.hideTwoFactorModal()
    }
    this.scrollPosition = window.pageYOffset

    /**
     * Disable scrolling
     */
    const $body = document.querySelector('body')
    $body.style.overflow = 'hidden'
    $body.style.position = 'fixed'
    $body.style.top = `-${this.scrollPosition}px`
    $body.style.width = '100%'

    /**
     * Disabling Loading
     */
    this.loader.isLoading = false

    document.addEventListener('keyup', close)
    this.$on('hook:destroyed', async () => {
      document.removeEventListener('keyup', close)

      /**
       * Enable  scrolling
       */
      const $body = document.querySelector('body')
      $body.style.removeProperty('overflow')
      $body.style.removeProperty('position')
      $body.style.removeProperty('top')
      $body.style.removeProperty('width')

      window.scrollTo(0, this.scrollPosition)

      /**
       * Reset Store
       */
      await this.$store.dispatch('account/RESET_TWO_FACTOR_INITIALIZE')

      /**
       * Reset messages
       */
      await this.$store.commit('account/SET_MESSAGE_SUCCESS', null)
      await this.$store.commit('account/SET_MESSAGE_ERROR', null)
    })
  },
  methods: {
    async toggleTwoFactorModal() {
      await this.$store.dispatch('account/TOGGLE_SHOW_ENABLE_TWO_FACTOR_MODAL')
    },
    async hideTwoFactorModal() {
      await this.$store.commit(
        'account/SET_SHOW_ENABLE_TWO_FACTOR_MODAL',
        false
      )
    },
    toggleTwoFactorSecret() {
      this.showTwoFactorSecret = !this.showTwoFactorSecret
    },
    async userEnableTwoFactor() {
      try {
        await this.$store.dispatch(
          'account/ENABLE_TWO_FACTOR',
          this.twoFactor.code
        )

        if (this.$store.state.account.messages.success) {
          await this.$auth.fetchUser()
          await this.$store.commit(
            'account/SET_SHOW_ENABLE_TWO_FACTOR_MODAL',
            false
          )
          return this.$toast.success(
            this.$store.state.account.messages.success,
            {
              position: 'bottom-right',
            }
          )
        }

        if (this.$store.state.account.messages.errors) {
          if (this.$store.state.account.messages.errors.code) {
            this.twoFactor.errors.code = this.$store.state.account.messages.errors.code
          }
          return
        }

        if (this.$store.state.account.messages.error) {
          return this.$toast.error(this.$store.state.account.messages.error, {
            position: 'bottom-right',
          })
        }

        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },
    async downloadTwoFactorBackupCodes() {
      try {
        const res = await this.$axios.$get(
          '/api/account/two-factor/backup-codes'
        )
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `${this.$config.title.toLowerCase()}-backup-codes.txt`
        )
        document.body.appendChild(link)
        link.click()
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },
  },
}
</script>
