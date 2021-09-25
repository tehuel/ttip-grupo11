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

  getRecipesWith: async (axios, name) => {
    const recipesResponse = await axios.$get('/recipes/with/' + name)
    return recipesResponse.data
  },
}
