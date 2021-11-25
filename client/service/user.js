const formatProfile = (userProfileResponse) => {
  const { name, favRecipes } = userProfileResponse
  return {
    name,
    favRecipes,
  }
}

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
  register: async (axios, { email, password }) => {
    const registerResponse = await axios.$post('/users/register', {
      email,
      password,
    })
    return registerResponse
  },
}
