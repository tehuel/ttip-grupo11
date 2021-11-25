const formatUser = ({ _id, email, image, name }) => ({
  id: _id,
  email,
  image,
  name,
})

const formatComment = ({ _id, text, recipe, user, createdAt }) => ({
  id: _id,
  text,
  recipe,
  user: formatUser(user),
  createdAt: new Date(createdAt),
})

module.exports = {
  getComments: async (axios, { skip = 0, limit = 6, recipe = null }) => {
    const commentResponse = await axios.$get('/comments', {
      params: {
        skip,
        limit,
        recipe,
      },
    })
    return commentResponse.data.map(formatComment)
  },
  addComment: async (axios, { text, recipe, userToken }) => {
    const commentResponse = await axios.$post(
      '/comments',
      {
        recipe,
        text,
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    )
    return commentResponse.data
  },
}
