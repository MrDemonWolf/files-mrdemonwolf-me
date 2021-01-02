export const state = () => ({
  showMobileNavigation: false,
})

export const actions = {
  TOGGLESHOW_MOBILE_NAVIGATION({ state, commit }) {
    commit('SET_SHOW_MOBILE_NAVIGATION', !state.showMobileNavigation)
  },
  HIDE_MOBILE_NAVIGATION({ commit }) {
    commit('SET_SHOW_MOBILE_NAVIGATION', false)
  },
  SHOW_MOBILE_NAVIGATION({ commit }) {
    commit('SET_SHOW_MOBILE_NAVIGATION', true)
  },
}

export const mutations = {
  SET_SHOW_MOBILE_NAVIGATION(state, showMobileNavigation) {
    return (state.showMobileNavigation = showMobileNavigation)
  },
}
export const getters = {
  SHOW_MOBILE_NAVIGATION: (state) => {
    return state.showMobileNavigation
  },
}
