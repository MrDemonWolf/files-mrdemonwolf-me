export const state = () => ({
  twoFactorTokenRequested: false,
  twoFactorToken: null,
  messages: {
    success: null,
    error: null,
    errors: {
      email: null,
      password: null,
      code: null,
    },
  },
})

export const actions = {
  RESET_MESSAGES({ commit }) {
    commit('SET_MESSAGE_SUCCESS', null)
    commit('SET_MESSAGE_ERROR', null)
    commit('SET_MESSAGE_ERRORS_EMAIL', null)
    commit('SET_MESSAGE_ERRORS_PASSWORD', null)
    commit('SET_MESSAGE_ERRORS_CODE', null)
  },
}

export const mutations = {
  SET_TWO_FACTOR_TOKEN_REQUESTED(state, twoFactorTokenRequested) {
    return (state.twoFactorTokenRequested = twoFactorTokenRequested)
  },
  SET_TWO_FACTOR_TOKEN(state, twoFactorToken) {
    return (state.twoFactorToken = twoFactorToken)
  },
  SET_MESSAGE_SUCCESS: (state, message) => {
    return (state.messages.success = message)
  },
  SET_MESSAGE_ERROR: (state, message) => {
    return (state.messages.error = message)
  },
  SET_MESSAGE_ERRORS_EMAIL(state, message) {
    return (state.messages.errors.email = message)
  },
  SET_MESSAGE_ERRORS_PASSWORD(state, message) {
    return (state.messages.errors.password = message)
  },
  SET_MESSAGE_ERRORS_CODE(state, message) {
    return (state.messages.errors.code = message)
  },
}

export const getters = {
  TWO_FACTOR_TOKEN: (state) => {
    return state.twoFactorToken
  },
  TWO_FACTOR_TOKEN_REQUESTED: (state) => {
    return state.twoFactorTokenRequested
  },
  MESSAGE_ERROR: (state) => {
    return state.messages.error
  },
  MESSAGE_SUCCESS: (state) => {
    return state.messages.success
  },
  MESSAGE_ERRORS_EMAIL: (state) => {
    return state.messages.errors.email
  },
  MESSAGE_ERRORS_PASSWORD: (state) => {
    return state.messages.errors.password
  },
  MESSAGE_ERRORS_CODE: (state) => {
    return state.messages.errors.code
  },
}
