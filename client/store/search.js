const RecipeService = require('../service/recipe')

export const state = () => ({
  loading: false,
  results: [],
})

export const actions = {
  async searchRecipes({ commit }, { ingredients, tags }) {
    // TODO: Handle errors!!
    // TODO: add loading
    const foundRecipes = await RecipeService.searchRecipes(this.$axios, {
      ingredients,
      tags,
    })
    commit('setSearchResults', foundRecipes)
    await this.$router.push('/results')
  },
}

export const mutations = {
  setLoading(state, loadingState) {
    state.loading = loadingState
  },

  setSearchResults(state, recipesList) {
    state.results = [...recipesList]
  },
}
