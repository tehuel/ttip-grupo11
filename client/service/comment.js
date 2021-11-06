const formatComment = (CommentResponse) => ({
  id: CommentResponse._id,
  text: CommentResponse.text,
  recipe: CommentResponse.recipe,
  user: CommentResponse.user,
  createdAt: new Date(CommentResponse.createdAt),
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
    console.log('getComments', commentResponse)
    return commentResponse.data.map(formatComment)
  },
  addComment: async (axios, { text, recipe, userToken }) => {
    console.log('addComment', { text, recipe, userToken })
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
    console.log('getComments', commentResponse)
    return commentResponse.data
  },
}
