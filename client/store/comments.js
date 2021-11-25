const CommentService = require('../service/comment')

export const state = () => ({
  list: [],
})

export const actions = {
  async getComments({ commit, state }, { recipe }) {
    commit('setList', [])
    const foundComments = await CommentService.getComments(this.$axios, {
      skip: 0,
      limit: 999,
      recipe,
    })
    commit('setList', foundComments)
  },
  async addComment({ commit, dispatch, state }, { text, recipe, userToken }) {
    await CommentService.addComment(this.$axios, {
      text,
      recipe,
      userToken,
    })
    dispatch('getComments', { recipe })
    // commit('setList', foundComments)
  },
}

export const mutations = {
  setList(state, comments) {
    state.list = [...comments]
  },
}
