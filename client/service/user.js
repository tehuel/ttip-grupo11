module.exports = {
  authenticate: async (axios, { email, password }) => {
    const authenticateResponse = await axios.$post('/users/authenticate', {
      email,
      password,
    })
    return authenticateResponse
  },
}
