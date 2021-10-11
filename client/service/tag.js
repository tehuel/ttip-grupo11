module.exports = {
    getTags: async (axios) => {
      const tagsResponse = await axios.$get('/tags')
      return tagsResponse.data.map((tag) => {
        // format tags
        return {
          id: tag._id,
          name: tag.name,
          createdAt: new Date(tag.createdAt),
        }
      })
    },
  }
  