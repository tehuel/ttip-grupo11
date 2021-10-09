const formatRecipe = (RecipeResponse) => ({
  id: RecipeResponse._id,
  name: RecipeResponse.name,
  description: RecipeResponse.description,
  ingredients: RecipeResponse.ingredients,
  rating: RecipeResponse.rating,
  imgUrl: RecipeResponse.imgUrl,
  createdAt: new Date(RecipeResponse.createdAt),
})

module.exports = {
  getLatestRecipes: async (axios) => {
    const recipesResponse = await axios.$get('/recipes')
    console.log('getLatestRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },

  searchRecipes: async (axios, ingredients) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // mando el listado de ingredientes en el body
      ingredients,
    })
    return recipesResponse.data.map(formatRecipe)
  },
}
