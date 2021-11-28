const formatProfile = ({ name, email, createdRecipes, favRecipes }) => {
  return {
    name,
    email,
    createdRecipes,
    favRecipes,
  }
}

const formatAuthenticatedUser = ({ _id: id, token }) => {
  return {
    id,
    token,
  }
}

module.exports = {
  authenticate: async (axios, { email, password }) => {
    const authenticateResponse = await axios.$post('/users/authenticate', {
      email,
      password,
    })
    return formatAuthenticatedUser(authenticateResponse.data)
  },
  getProfile: async (axios, { userId }) => {
    const userProfileResponse = await axios.$get(`/users/${userId}`)
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
