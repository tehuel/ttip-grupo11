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
  async update({ commit }, { recipeId, recipe, userToken }) {
    try {
      const updatedRecipe = await RecipeService.updateRecipe(this.$axios, {
        recipeId,
        recipe,
        userToken,
      })
      commit('setSingle', { updatedRecipe })
    } catch (e) {
      console.log(e)
      throw new Error('Error actualizando receta.')
    }
  },
  async rate({ commit, state }, { rating, id, userToken }) {
    const ratedRecipe = await RecipeService.rateRecipe(this.$axios, {
      rating,
      id,
      userToken,
    })
    return ratedRecipe
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
