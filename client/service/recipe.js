const formatRecipe = (RecipeResponse) => ({
  id: RecipeResponse._id,
  name: RecipeResponse.name,
  user: RecipeResponse.user,
  description: RecipeResponse.description,
  instructions: RecipeResponse.instructions,
  ingredients: RecipeResponse.ingredients,
  ratings: RecipeResponse.ratings,
  avgRating: RecipeResponse.avgRating,
  image: RecipeResponse.image,
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
    return recipesResponse.data.map(formatRecipe)
  },
  getSingleRecipe: async (axios, { id }) => {
    const recipeResponse = await axios.$get(`/recipes/${id}`)
    return formatRecipe(recipeResponse.data)
  },
  searchRecipes: async (
    axios,
    { name = '', ingredients = [], tags = [], ids = [] }
  ) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // agrego condicionalmente los parámetros de busqueda
      // (no se agregan los que están vacíos)
      ...(name.length && { name }),
      ...(ingredients.length && { ingredients }),
      ...(tags.length && { tags }),
      ...(ids.length && { ids }),
    })
    return recipesResponse.data.map(formatRecipe)
  },
  createRecipe: async (axios, { recipe, userToken }) => {
    const createdRecipe = await axios.$post(
      '/recipes',
      { recipe },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    return formatRecipe(createdRecipe.data)
  },
  rateRecipe: async (axios, { rating, id, userToken }) => {
    const ratedRecipe = await axios.$post(
      `/recipes/${id}/rate`,
      { rating },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    return formatRecipe(ratedRecipe.data)
  },
}
