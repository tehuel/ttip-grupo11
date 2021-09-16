module.exports = {
  getIngredients: async (axios) => {
    const ingredientsResponse = await axios.$get('/ingredients')
    return ingredientsResponse.data.map((ingredient) => {
      // format ingredients
      return {
        id: ingredient._id,
        name: ingredient.name,
        createdAt: new Date(ingredient.createdAt),
      }
    })
  },
}
