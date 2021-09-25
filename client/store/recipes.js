const RecipeService = require('../service/recipe')

export const state = () => ({
  list: [],
})

export const actions = {
  async searchRecipes({ commit }, ingredients) {
    const foundRecipes = await RecipeService.searchRecipes(
      this.$axios,
      ingredients
    )
    commit('set', foundRecipes)
    await this.$router.push('/results')
  },
}

export const mutations = {
  set(state, recipesList) {
    state.list = [...recipesList]
  },
}
