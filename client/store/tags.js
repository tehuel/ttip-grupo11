const TagService = require('../service/ingredient')

export const state = () => ({
  list: [],
})

export const actions = {
  async getTags({ commit }) {
    const tags = await TagService.getTags(this.$axios)
    commit('set', tags)
  },
}

export const mutations = {
  set(state, tagsList) {
    state.list = [...tagsList]
  },
}
