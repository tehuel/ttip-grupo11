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

  searchRecipes: async (axios, { ingredients, tags }) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      ingredients,
      tags,
    })
    // console.log('searchRecipes', recipesResponse)
    return recipesResponse.data.map(formatRecipe)
  },
}
