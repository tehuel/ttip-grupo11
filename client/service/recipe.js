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
  getLatestRecipes: async (axios) => {
    const recipesResponse = await axios.$get('/recipes')
    // console.log('getLatestRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },

  searchRecipesByIngredients: async (axios, ingredients) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // mando el listado de ingredientes en el body
      ingredients,
    })
    // console.log('searchRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },

  searchRecipesByTag: async (axios, tags) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // mando el listado de tags en el body
      tags,
    })
    return recipesResponse
  },
}
