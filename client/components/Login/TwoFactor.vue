<template>
  <div class="mt-8 sm:mx-auto sm:w-1/2 sm:max-w-xs">
    <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <form
        class="space-y-6"
        novalidate
        @submit.prevent="userLoginWithTwoFactor"
      >
        <SharedAlert
          v-if="$store.state.login.messages.error"
          type="danger"
          :message="$store.state.login.messages.error"
        />
        <div>
          <div class="mt-1">
            <input
              id="twoFactorCode"
              v-model="loginTwoFactor.code"
              aria-label="Two Factor"
              placeholder="123456"
              name="twoFactorCode"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              :class="{
                'border-red-500': $store.state.login.messages.errors.code,
              }"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              autoFocus
            />
            <span
              v-if="$store.state.login.messages.errors.code"
              class="text-red-500"
              >{{ $store.state.login.messages.errors.code }}</span
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="!isLoading">Verify</span>
            <span v-else>
              <fa
                :icon="['fas', 'circle']"
                class="inline-block w-3 h-3 mr-2 text-white -animate-delay-1 animate-bounce"
              />
              <fa
                :icon="['fas', 'circle']"
                class="inline-block w-3 h-3 mr-2 text-white -animate-delay-2 animate-bounce"
              />
              <fa
                :icon="['fas', 'circle']"
                class="inline-block w-3 h-3 mr-2 text-white animate-bounce"
              />
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      loginTwoFactor: {
        code: '',
      },
    }
  },

  methods: {
    async userLoginWithTwoFactor() {
      try {
        this.isLoading = true

        await this.$store.dispatch('login/RESET_MESSAGES')
        const twoFactor = await this.$axios.$post('/api/auth/two-factor', {
          code: this.loginTwoFactor.code,
          token: this.$store.state.login.twoFactorToken,
        })
        await this.$auth.setUserToken(
          twoFactor.access_token,
          twoFactor.refresh_token
        )
      } catch (e) {
        if (e.response.data.codes) {
          const { code, token } = e.response.data.codes

          if (token) {
            return this.$toast.error('Oops.. Something Went Wrong..', {
              position: 'bottom-right',
            })
          }

          if (code) {
            switch (code) {
              case 'REQUIRED':
                this.$store.commit(
                  'login/SET_MESSAGE_ERRORS_CODE',
                  'Code is required.'
                )
                break
              default:
            }
          }
          this.isLoading = false
        } else if (e.response.data.code) {
          switch (e.response.data.code) {
            case 'INVALID_TWO_FACTOR_CODE':
              this.$store.commit(
                'login/SET_MESSAGE_ERROR',
                'Invalid two factor token.'
              )
              break

            default:
              this.$toast.error('Oops.. Something Went Wrong..', {
                position: 'bottom-right',
              })
              break
          }
          this.isLoading = false
        } else {
          this.$toast.error('Oops.. Something Went Wrong..', {
            position: 'bottom-right',
          })
          this.isLoading = false
        }
      }
    },
  },
}
</script>
