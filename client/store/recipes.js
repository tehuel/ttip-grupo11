const RecipeService = require('../service/recipe')

export const state = () => ({
  latest: [],
})

export const actions = {
  async getLatestRecipes({ commit, state }) {
    const foundRecipes = await RecipeService.getLatestRecipes(this.$axios, {
      skip: state.latest.length,
    })
    commit('setLatest', foundRecipes)
  },
}

export const mutations = {
  setLatest(state, recipesList) {
    state.latest = [...state.latest, ...recipesList]
  },
}
