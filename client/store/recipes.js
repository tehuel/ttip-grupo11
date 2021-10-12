const RecipeService = require('../service/recipe')

export const state = () => ({
  latest: [],
  searchResults: [],
})

export const actions = {
  async getLatestRecipes({ commit }) {
    const foundRecipes = await RecipeService.getLatestRecipes(this.$axios)
    commit('setLatest', foundRecipes)
    await this.$router.push('/results')
  },

  async searchRecipes({ commit }, ingredients) {
    // TODO: Handle errors!!
    // TODO: add loading
    const foundRecipes = await RecipeService.searchRecipes(
      this.$axios,
      ingredients
    )
    commit('setSearchResults', foundRecipes)
    await this.$router.push('/results')
  },
}

export const mutations = {
  setLatest(state, recipesList) {
    state.latest = [...recipesList]
  },

  setSearchResults(state, recipesList) {
    state.searchResults = [...recipesList]
  },
}
