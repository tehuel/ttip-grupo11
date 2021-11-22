const RecipeService = require('../service/recipe')

export const state = () => ({
  single: null,
  latest: [],
})

export const actions = {
  async getLatestRecipes({ commit, state }) {
    const foundRecipes = await RecipeService.getLatestRecipes(this.$axios, {
      skip: state.latest.length,
    })
    commit('setLatest', foundRecipes)
  },
  async getSingleRecipe({ commit, state }, { id }) {
    commit('setSingle', null)
    const foundRecipe = await RecipeService.getSingleRecipe(this.$axios, {
      id,
    })
    commit('setSingle', foundRecipe)
  },
  async create({ commit, state }, { recipe, userToken }) {
    const createdRecipe = await RecipeService.createRecipe(this.$axios, {
      recipe,
      userToken,
    })
    return createdRecipe
  },
}

export const mutations = {
  setLatest(state, recipesList) {
    state.latest = [...state.latest, ...recipesList]
  },
  setSingle(state, singleRecipe) {
    state.single = singleRecipe
  },
}
