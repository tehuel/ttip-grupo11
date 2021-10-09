const formatIngredient = (IngredientResponse) => {
  return {
    id: IngredientResponse._id,
    name: IngredientResponse.name,
    createdAt: new Date(IngredientResponse.createdAt),
  }
}

module.exports = {
  getIngredients: async (axios) => {
    const ingredientsResponse = await axios.$get('/ingredients')
    // console.log('getIngredients', ingredientsResponse)
    return ingredientsResponse.data.map(formatIngredient)
  },
}
