const UserService = require('../service/user')

export const state = () => ({
  email: null,
  token: null,
  profile: null,
  favRecipes: null,
  createdRecipes: null,
})

export const actions = {
  async authenticate({ commit, dispatch }, { email, password }) {
    // TODO: add loading
    try {
      const authenticatedUser = await UserService.authenticate(this.$axios, {
        email,
        password,
      })
      const { token } = authenticatedUser.data
      // guardo el token y el email en state
      commit('setAuthenticated', { email, token })
      dispatch('getProfile', { userToken: token })
      dispatch('myFavRecipes', { userToken: token })
      window &&
        window.$nuxt.$bvToast.toast('Sesión Iniciada correctamente', {
          title: 'Bienvenido',
          variant: 'success',
          appendToast: true,
          solid: true,
        })
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
  async getProfile({ dispatch, commit }, { userToken }) {
    // TODO: add loading
    try {
      // console.log('userStore.getProfile', { userToken })
      const profileResponse = await UserService.getProfile(this.$axios, {
        userToken,
      })
      // console.log('userStore.profile', { profileResponse })
      commit('setProfile', { profile: profileResponse })
    } catch (e) {
      throw new Error('Error obteniendo perfil del usuario')
    }
  },
  async addRecipeToFavourites(
    { commit, dispatch, state },
    { recipe, userToken }
  ) {
    const addRecipeToFavouritesResponse = await UserService.addRecipeToFav(
      this.$axios,
      {
        recipe,
        userToken,
      }
    )
    commit('setProfile', {
      profile: addRecipeToFavouritesResponse,
    })
    return addRecipeToFavouritesResponse
  },
  async myFavRecipes({ dispatch, commit }, { userToken }) {
    try {
      const favRecipesResponse = await UserService.myFavRecipes(this.$axios, {
        userToken,
      })
      commit('setFavRecipes', { favRecipes: favRecipesResponse })
    } catch (e) {
      throw new Error('Error obteniendo recetas favoritas')
    }
  },
  async myCreatedRecipes({ dispatch, commit }, { userToken }) {
    try {
      const createdRecipesResponse = await UserService.myCreatedRecipes(
        this.$axios,
        {
          userToken,
        }
      )
      commit('setCreatedRecipes', { createdRecipes: createdRecipesResponse })
    } catch (e) {
      throw new Error('Error obteniendo recetas creadas')
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
  setProfile(state, { profile }) {
    state.profile = profile
  },
  logout(state) {
    state.email = null
    state.token = null
    state.profile = null
    if (process.client) {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userToken')
    }
  },
  setFavRecipes(state, { favRecipes }) {
    state.favRecipes = favRecipes
  },
  setCreatedRecipes(state, { createdRecipes }) {
    state.createdRecipes = createdRecipes
  },
}
