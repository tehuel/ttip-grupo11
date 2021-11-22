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
  async register({ dispatch, commit }, { email, password }) {
    // TODO: add loading
    try {
      const registerResponse = await UserService.register(this.$axios, {
        email,
        password,
      })
      if (registerResponse.message === 'Created') {
        dispatch('authenticate', {
          email,
          password,
        })
      }
    } catch (e) {
      throw new Error('Error registrando usuario')
    }
  },
  async logout({ commit }) {
    commit('logout')
    await this.$router.push('/')
  },
}

export const mutations = {
  setAuthenticated(state, { email, token }) {
    state.email = email
    state.token = token
    if (process.client) {
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userToken', token)
    }
  },
  logout(state) {
    state.email = null
    state.token = null
    if (process.client) {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userToken')
    }
  },
}
