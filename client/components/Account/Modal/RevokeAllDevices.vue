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
      <form @submit.prevent="revokeSessions">
        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
            >
              <fa :icon="['fas', 'lock']" class="w-6 h-6 text-red-600" />
            </div>
            <div class="my-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div>
                <h3 class="text-xl font-medium leading-6 text-red-500">
                  Are you sure you want to revoke all devices?
                </h3>
              </div>
              <div class="my-3">
                <p
                  class="block my-2 text-sm font-medium leading-5 text-gray-700"
                >
                  This will revoke all your past devices plus the current one
                  your logged in to. Can't be undone and you will have to
                  relogin after you click comfirm.
                </p>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="submit"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border rounded-md order-transparent hover:bg-red-500 focus:outline-none focus:ring"
              >
                Comfirm
              </button>
            </span>
            <span
              class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring sm:text-sm sm:leading-5"
                @click="hideRevokeAllSessionsModal"
                @keydown.esc="hideRevokeAllSessionsModal"
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
  mounted() {
    this.popupItem = this.$refs.background

    const close = (e) => {
      const ESC = 27
      if (e.keyCode !== ESC) return
      this.hideRevokeAllSessionsModal()
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

    document.addEventListener('keyup', close)
    this.$on('hook:destroyed', () => {
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
    })
  },
  methods: {
    async toggleRevokeAllSessionsModal() {
      await this.$store.dispatch(
        'account/TOGGLE_SHOW_REVOKE_ALL_SESSIONS_MODAL'
      )
    },
    async hideRevokeAllSessionsModal() {
      await this.$store.commit(
        'account/SET_SHOW_REVOKE_ALL_SESSIONS_MODAL',
        false
      )
      await this.$store.commit('account/SET_MESSAGE_SUCCESS', null)
      await this.$store.commit('account/SET_MESSAGE_ERROR', null)
    },
    async revokeSessions() {
      try {
        await this.$store.dispatch('account/REVOKE_SESSIONS')
        await this.$auth.logout()

        if (this.$store.state.account.messages.success) {
          switch (this.$store.state.account.messages.success) {
            case 'ALL_SESSIONS_REVOKE':
              this.$toast.success('All devices has been revoked.', {
                position: 'bottom-right',
              })
              break

            default:
          }
        } else {
          this.$toast.error('Oops.. Something Went Wrong..', {
            position: 'bottom-right',
          })
        }
      } catch (e) {
        this.$toast.error('Oops.. Something Went Wrong..', {
          position: 'bottom-right',
        })
      }
    },
  },
}
</script>
