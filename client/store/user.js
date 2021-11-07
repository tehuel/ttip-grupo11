const UserService = require('../service/user')

export const state = () => ({
  email: null,
  token: null,
})

export const actions = {
  async authenticate({ commit }, { email, password }) {
    // TODO: add loading
    try {
      const authenticatedUser = await UserService.authenticate(this.$axios, {
        email,
        password,
      })
      const { token } = authenticatedUser.data
      // guardo el token y el email en state
      commit('setAuthenticated', { email, token })
    } catch (e) {
      window &&
        window.$nuxt.$bvToast.toast('Error iniciando sesión', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      commit('logout')
    }

    await this.$router.push('/')
  },
  async register({ commit }, { email, password }) {
    // TODO: Handle errors!!
    // TODO: add loading
    await UserService.register(this.$axios, {
      email,
      password,
    })
    await this.$router.push('/')
  },
  async logout({ commit }) {
    commit('setAuthenticated', { email: null, token: null })
    await this.$router.push('/')
  },
}

export const mutations = {
  setAuthenticated(state, { email, token }) {
    state.email = email
    state.token = token
  },
  logout(state) {
    state.email = null
    state.token = null
  },
}
