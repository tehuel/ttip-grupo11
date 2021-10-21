const RecipeService = require('../service/recipe')

export const state = () => ({
  latest: [],
})

export const actions = {
  async getLatestRecipes({ commit }) {
    const foundRecipes = await RecipeService.getLatestRecipes(this.$axios)
    commit('setLatest', foundRecipes)
    await this.$router.push('/results')
  },
}

export const mutations = {
  setLatest(state, recipesList) {
    state.latest = [...recipesList]
  },
}
