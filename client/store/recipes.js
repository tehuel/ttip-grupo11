const RecipeService = require('../service/recipe')

export const state = () => ({
  list: [],
})

export const actions = {
  async getRecipesWith({ commit }, name) {
    const recipes = await RecipeService.getRecipesWith(this.$axios, name)
    commit('set', recipes)
  },
}

export const mutations = {
  set(state, recipesList) {
    state.list = [...recipesList]
  },
}
