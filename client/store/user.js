const UserService = require('../service/user')
const RecipeService = require('../service/recipe')

export const state = () => ({
  email: null,
  id: null,
  token: null,
  profile: null,

  favRecipes: [],
  createdRecipes: [],
})

export const actions = {
  async authenticate({ commit, dispatch }, { email, password }) {
    try {
      const authUser = await UserService.authenticate(this.$axios, {
        email,
        password,
      })
      const { id, token } = authUser
      // guardo el token y el email en state
      commit('setAuthenticated', { id, email, token })
      dispatch('getProfile', { userId: id })
      // dispatch('myFavRecipes', { userToken: token })
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
  async register({ dispatch }, { email, password }) {
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
  async getProfile({ commit }, { userId }) {
    try {
      const profile = await UserService.getProfile(this.$axios, {
        userId,
      })
      commit('setProfile', { profile })

      const favRecipes = await RecipeService.searchRecipes(this.$axios, {
        ids: profile.favRecipes,
      })
      commit('setFavRecipes', { favRecipes })

      const createdRecipes = await RecipeService.searchRecipes(this.$axios, {
        ids: profile.createdRecipes,
      })
      commit('setCreatedRecipes', { createdRecipes })
    } catch (e) {
      console.log(e)
      throw new Error('Error obteniendo perfil del usuario')
    }
  },
  async addRecipeToFavourites({ commit }, { recipe, userToken }) {
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
  async logout({ commit }) {
    commit('logout')
    await this.$router.push('/')
  },
}

export const mutations = {
  setAuthenticated(state, { id, email, token }) {
    state.id = id
    state.email = email
    state.token = token

    if (process.client) {
      localStorage.setItem('userId', id)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userToken', token)
    }
  },
  setProfile(state, { profile }) {
    state.profile = profile
  },
  logout(state) {
    state.id = null
    state.email = null
    state.token = null
    state.profile = null
    if (process.client) {
      localStorage.removeItem('userId')
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
