module.exports = {
  addToFav: async (axios, { recipe, userToken }) => {
    console.log('addToFav', { recipe, userToken })
    const response = await axios.$post(
      '/users/addToFav',
      {
        recipe,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    console.log('getComments', response)
    return response.data
  },
}
