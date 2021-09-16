const IngredientService = require('../service/ingredient')

export const state = () => ({
  list: [],
})

export const actions = {
  async getIngredients({ commit }) {
    const ingredients = await IngredientService.getIngredients(this.$axios)
    commit('set', ingredients)
  },
}

export const mutations = {
  set(state, ingredientsList) {
    state.list = [...ingredientsList]
  },
}
