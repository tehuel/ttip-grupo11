const formatTag = (IngredientResponse) => {
  return {
    id: IngredientResponse._id,
    name: IngredientResponse.name,
    createdAt: new Date(IngredientResponse.createdAt),
  }
}

module.exports = {
  getTags: async (axios) => {
    const tagsResponse = await axios.$get('/tags')
    return tagsResponse.data.map(formatTag)
  },
}
