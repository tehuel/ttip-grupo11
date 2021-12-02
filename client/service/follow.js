const formatProfile = ({
  _id: id = '',
  name = '',
  email = '',
  image = '',
  createdRecipes = [],
  favRecipes = [],
}) => {
  return {
    id,
    name,
    email,
    image,
    createdRecipes,
    favRecipes,
  }
}

module.exports = {
  followUser: async (axios, { userId, profile, userToken }) => {
    const followUserResponse = await axios.$post(
      'follows/',
      {
        userId,
        profile,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    return formatProfile(followUserResponse.data)
  },
}
