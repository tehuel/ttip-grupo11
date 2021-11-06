const formatRecipe = (RecipeResponse) => ({
  id: RecipeResponse._id,
  name: RecipeResponse.name,
  description: RecipeResponse.description,
  ingredients: RecipeResponse.ingredients,
  rating: RecipeResponse.rating,
  imgUrl: RecipeResponse.imgUrl,
  tags: RecipeResponse.tags,
  createdAt: new Date(RecipeResponse.createdAt),
})

module.exports = {
  getLatestRecipes: async (axios, { skip = 0, limit = 6 }) => {
    const recipesResponse = await axios.$get('/recipes', {
      params: {
        skip,
        limit,
      },
    })
    // console.log('getLatestRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },

  searchRecipes: async (axios, { name, ingredients, tags }) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // agrego condicionalmente los parámetros de busqueda
      // (no se agregan los que están vacíos)
      ...(name.length && { name }),
      ...(ingredients.length && { ingredients }),
      ...(tags.length && { tags }),
    })
    // console.log('searchRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },
}
