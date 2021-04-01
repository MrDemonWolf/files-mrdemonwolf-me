export const state = () => ({
  messages: {
    success: null,
    error: null,
    errors: {
      username: null,
      email: null,
      password: null,
    },
  },
})

export const actions = {
  RESET_MESSAGES({ commit }) {
    commit('SET_MESSAGE_SUCCESS', null)
    commit('SET_MESSAGE_ERROR', null)
    commit('SET_MESSAGE_ERRORS_USERNAME', null)
    commit('SET_MESSAGE_ERRORS_EMAIL', null)
    commit('SET_MESSAGE_ERRORS_PASSWORD', null)
  },
}

export const mutations = {
  SET_MESSAGE_SUCCESS: (state, message) => {
    return (state.messages.success = message)
  },
  SET_MESSAGE_ERROR: (state, message) => {
    return (state.messages.error = message)
  },
  SET_MESSAGE_ERRORS_USERNAME(state, message) {
    return (state.messages.errors.username = message)
  },
  SET_MESSAGE_ERRORS_EMAIL(state, message) {
    return (state.messages.errors.email = message)
  },
  SET_MESSAGE_ERRORS_PASSWORD(state, message) {
    return (state.messages.errors.password = message)
  },
}

export const getters = {
  MESSAGE_ERROR: (state) => {
    return state.messages.error
  },
  MESSAGE_SUCCESS: (state) => {
    return state.messages.success
  },
  MESSAGE_ERRORS_USERNAME: (state) => {
    return state.messages.errors.username
  },
  MESSAGE_ERRORS_EMAIL: (state) => {
    return state.messages.errors.email
  },
  MESSAGE_ERRORS_PASSWORD: (state) => {
    return state.messages.errors.password
  },
}
