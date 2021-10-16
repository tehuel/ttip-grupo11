const IngredientService = require('../service/ingredient')

export const state = () => ({
  list: [],
})

export const actions = {
  async getIngredients({ commit }) {
    try {
      const ingredients = await IngredientService.getIngredients(this.$axios)
      commit('set', ingredients)
    } catch (e) {
      window &&
        window.$nuxt.$bvToast.toast('Error obteniendo ingredientes', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      commit('set', [])
    }
  },
}

export const mutations = {
  set(state, ingredientsList) {
    state.list = [...ingredientsList]
  },
}
