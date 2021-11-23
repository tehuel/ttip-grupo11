const FavService = require('../service/favourite')

export const actions = {
  async addToFav({ commit, dispatch, state }, { recipe, userToken }) {
    // console.log('addToFav', { recipe, userToken })
    const response = await FavService.addToFav(this.$axios, {
      recipe,
      userToken,
    })
    console.log('addComment response: ', response)
    // dispatch('getComments', { recipe })
    // commit('setList', foundComments)
  },
}

export const mutations = {
  setList(state, comments) {
    state.list = [...comments]
  },
}
