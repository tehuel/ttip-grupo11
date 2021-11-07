const RecipeService = require('../service/recipe')

export const state = () => ({
  // guardo los parámetros de búsqueda en el store global
  params: {
    name: null,
    ingredients: null,
    tags: null,
  },
  results: [],
})

export const actions = {
  async searchRecipes({ commit }, { name, ingredients, tags }) {
    // TODO: Handle errors!!
    // TODO: add loading
    commit('setSearchParams', { name, ingredients, tags })
    const foundRecipes = await RecipeService.searchRecipes(this.$axios, {
      name,
      ingredients,
      tags,
    })
    commit('setSearchResults', foundRecipes)
    await this.$router.push('/results')
  },
}

export const mutations = {
  setSearchParams(state, { name, ingredients, tags }) {
    state.params = {
      name,
      ingredients,
      tags,
    }
  },
  resetSearchParams(state) {
    state.params = {
      name: null,
      ingredients: null,
      tags: null,
    }
  },
  setSearchResults(state, recipesList) {
    state.results = [...recipesList]
  },
}
