const formatProfile = (userProfileResponse) => {
  const { name, email, favRecipes } = userProfileResponse
  return {
    name,
    email,
    favRecipes,
  }
}

const formatRecipe = (RecipeResponse) => ({
  _id: RecipeResponse._id,
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
  authenticate: async (axios, { email, password }) => {
    const authenticateResponse = await axios.$post('/users/authenticate', {
      email,
      password,
    })
    return authenticateResponse
  },
  getProfile: async (axios, { userToken }) => {
    const userProfileResponse = await axios.$get('/users/profile', {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    return formatProfile(userProfileResponse.data)
  },
  addRecipeToFav: async (axios, { recipe, userToken }) => {
    const addRecipeToFavResponse = await axios.$post(
      '/users/addToFav',
      {
        recipe,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    return formatProfile(addRecipeToFavResponse.data)
  },
  myFavRecipes: async (axios, { userToken }) => {
    const favRecipesResponse = await axios.$get('/users/myFavRecipes', {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    return formatRecipe(favRecipesResponse.data)
  },

  register: async (axios, { email, password }) => {
    const registerResponse = await axios.$post('/users/register', {
      email,
      password,
    })
    return registerResponse
  },
}
