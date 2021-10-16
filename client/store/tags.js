const TagService = require('../service/tag')

export const state = () => ({
  list: [],
})

export const actions = {
  async getTags({ commit }) {
    try {
      const tags = await TagService.getTags(this.$axios)
      commit('set', tags)
    } catch (e) {
      window.$nuxt.$bvToast.toast('Error obteniendo tags', {
        title: 'Error',
        variant: 'danger',
        appendToast: true,
        solid: true,
      })
      commit('set', [])
    }
  },
}

export const mutations = {
  set(state, tagsList) {
    state.list = [...tagsList]
  },
}
