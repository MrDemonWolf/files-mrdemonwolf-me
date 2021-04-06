export const state = () => ({
  showEnableTwoFactorModal: false,
  showDisableTwoFactorModal: false,
  showRevokeAllSessionsModal: false,
  twoFactorQrCode: null,
  twoFactorSecret: null,
  twofactorBackupCodes: [],
  sessions: [],
  messages: {
    success: null,
    error: null,
    errors: {
      code: null,
    },
  },
  sidebarOpen: false,
})

export const actions = {
  async FETCH_SESSIONS({ commit }) {
    const res = await this.$axios.$get('/api/account/sessions')
    commit('SET_SESSIONS', res.sessions)
  },
  TOGGLE_SHOW_ENABLE_TWO_FACTOR_MODAL({ state, commit }) {
    commit('SET_SHOW_ENABLE_TWO_FACTOR_MODAL', !state.showEnableTwoFactorModal)
  },
  TOGGLE_SHOW_DISABLE_TWO_FACTOR_MODAL({ state, commit }) {
    commit(
      'SET_SHOW_DISABLE_TWO_FACTOR_MODAL',
      !state.showDisableTwoFactorModal
    )
  },
  TOGGLE_SHOW_REVOKE_ALL_SESSIONS_MODAL({ state, commit }) {
    commit(
      'SET_SHOW_REVOKE_ALL_SESSIONS_MODAL',
      !state.showRevokeAllSessionsModal
    )
  },
  async SET_TWO_FACTOR_INITIALIZE({ commit }) {
    try {
      const res = await this.$axios.$post('/api/account/two-factor')
      commit('SET_TWO_FACTOR_QR_CODE', res.qrCode)
      commit('SET_TWO_FACTOR_SECRET', res.secret)

      commit('SET_TWO_FACTOR_BACKUP_CODES', res.backupCodes)
      commit('SET_MESSAGE_ERROR', null)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', null)
      commit('SET_MESSAGE_ERROR', e.response.data.code)
    }
  },
  async ENABLE_TWO_FACTOR({ commit, dispatch }, code) {
    try {
      const res = await this.$axios.$put('/api/account/two-factor', {
        code,
      })
      commit('SET_SHOW_ENABLE_TWO_FACTOR_MODAL', false)
      dispatch('RESET_TWO_FACTOR_INITIALIZE')
      commit('SET_MESSAGE_ERROR', null)
      commit('SET_MESSAGE_SUCCESS', res.code)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', null)
      if (e.response.data.codes) {
        const { code } = e.response.data.code
        if (code) {
          switch (code) {
            case 'REQUIRED':
              commit(
                'SET_MESSAGE_ERRORS_CODE',
                'Code verification is required.'
              )
              break
            default:
          }
        }
      } else {
        commit('SET_MESSAGE_ERROR', e.response.data.code)
      }
    }
  },
  async DISABLE_TWO_FACTOR({ commit }, code) {
    try {
      const res = await this.$axios.$delete(
        `/api/account/two-factor?code=${code}`
      )

      commit('SET_MESSAGE_ERROR', null)
      commit('SET_MESSAGE_SUCCESS', res.code)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', null)
      if (e.response.data.codes) {
        const { code } = e.response.data.code
        if (code) {
          switch (code) {
            case 'REQUIRED':
              commit(
                'SET_MESSAGE_ERRORS_CODE',
                'Code verification is required.'
              )
              break
            default:
          }
        }
      } else {
        commit('SET_MESSAGE_ERROR', e.response.data.code)
      }
    }
  },
  RESET_TWO_FACTOR_INITIALIZE({ commit }) {
    commit('SET_TWO_FACTOR_QR_CODE', '')
    commit('SET_TWO_FACTOR_SECRET', '')
    commit('SET_TWO_FACTOR_BACKUP_CODES', [])
  },
  async REVOKE_SESSION({ commit, state }, index) {
    try {
      const res = await this.$axios.$delete(
        `/api/account/sessions/${state.sessions[index]._id}`
      )

      commit('DELETE_SESSION', index)

      commit('SET_MESSAGE_ERROR', null)
      commit('SET_MESSAGE_SUCCESS', res.code)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', null)
      commit('SET_MESSAGE_ERROR', e.response.data.code)
    }
  },
  async REVOKE_SESSIONS({ commit }) {
    try {
      const res = await this.$axios.$delete('/api/account/sessions')

      commit('SET_SESSIONS', [])

      commit('SET_MESSAGE_ERROR', null)
      commit('SET_MESSAGE_SUCCESS', res.code)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', null)
      commit('SET_MESSAGE_ERROR', e.response.data.code)
    }
  },
}

export const mutations = {
  SET_SESSIONS(state, sessions) {
    return (state.sessions = sessions)
  },
  SET_SHOW_ENABLE_TWO_FACTOR_MODAL(state, status) {
    return (state.showEnableTwoFactorModal = status)
  },
  SET_SHOW_DISABLE_TWO_FACTOR_MODAL(state, status) {
    return (state.showDisableTwoFactorModal = status)
  },
  SET_SHOW_REVOKE_ALL_SESSIONS_MODAL(state, status) {
    return (state.showRevokeAllSessionsModal = status)
  },
  SET_TWO_FACTOR_QR_CODE(state, qrCode) {
    return (state.twoFactorQrCode = qrCode)
  },
  SET_TWO_FACTOR_SECRET(state, secret) {
    return (state.twoFactorSecret = secret)
  },
  SET_TWO_FACTOR_BACKUP_CODES(state, codes) {
    return (state.twoFactorBackupCodes = codes)
  },
  DELETE_SESSION: (state, index) => {
    return state.sessions.splice(index, 1)
  },
  TOGGLE_SIDEBAR_OPEN(state) {
    return (state.sidebarOpen = !state.sidebarOpen)
  },
  SET_SIDEBAR_OPEN(state, boolean) {
    return (state.sidebarOpen = boolean)
  },
  SET_MESSAGE_SUCCESS: (state, success) => {
    return (state.messages.success = success)
  },
  SET_MESSAGE_ERROR: (state, error) => {
    return (state.messages.error = error)
  },
  SET_MESSAGE_ERRORS_CODE: (state, message) => {
    return (state.messages.errors.code = message)
  },
}

export const getters = {
  SESSIONS: (state) => {
    return state.sessions
  },
  SHOW_ENABLE_TWO_FACTOR_MODAL: (state) => {
    return state.showEnableTwoFactorModal
  },
  SHOW_DISABLE_TWO_FACTOR_MODAL: (state) => {
    return state.showDisableTwoFactorModal
  },
  SHOW_REVOKE_ALL_SESSIONS_MODAL: (state) => {
    return state.showRevokeAllSessionsModal
  },
  TWO_FACTOR_QR_CODE: (state) => {
    return state.twoFactorQrCode
  },
  TWO_FACTOR_SECRET: (state) => {
    return state.twoFactorSecret
  },
  TWO_FACTOR_BACKUP_CODES: (state) => {
    return state.twoFactorBackupCodes
  },
  SIDEBAR_OPEN: (state) => {
    return state.sidebarOpen
  },
  MESSAGE_SUCCESS: (state) => {
    return state.messages.success
  },
  MESSAGE_ERROR: (state) => {
    return state.messages.error
  },
  MESSAGE_ERRORS: (state) => {
    return state.messages.errors
  },
}
