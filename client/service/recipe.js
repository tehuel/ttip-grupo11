module.exports = {
  getRecipes: async (axios) => {
    const recipesResponse = await axios.$get('/recipes')
    return recipesResponse.data.map((recipe) => {
      // format recipes
      return {
        id: recipe._id,
        name: recipe.name,
        createdAt: new Date(recipe.createdAt),
      }
    })
  },

  searchRecipes: async (axios, ingredients) => {
    const recipesResponse = await axios.$post('/recipes/search', {
      // mando el listado de ingredientes en el body
      ingredients,
    })
    return recipesResponse
  },
}
