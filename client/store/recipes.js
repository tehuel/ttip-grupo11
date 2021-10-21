const RecipeService = require('../service/recipe')

export const state = () => ({
  loading: false,
  latest: [],
})

export const actions = {
  async getLatestRecipes({ commit, state }) {
    commit('setLoading', true)
    const foundRecipes = await RecipeService.getLatestRecipes(this.$axios, {
      skip: state.latest.length,
    })
    commit('setLatest', foundRecipes)
    setTimeout(() => commit('setLoading', false), 1000)
  },
}

export const mutations = {
  setLoading(state, loadingState) {
    state.loading = loadingState
  },

  setLatest(state, recipesList) {
    state.latest = [...state.latest, ...recipesList]
  },
}
