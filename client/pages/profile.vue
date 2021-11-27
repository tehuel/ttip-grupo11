<template>
  <div class="page">
    <div class="container my-5">
      <b-overlay :show="$fetchState.pending">
        <h1 class="h2 text-center">Perfil de Usuario</h1>
        <div class="recipe-feed">
          <h2 class="h3">Recetas Favoritas</h2>
          <div class="row">
            <div
              v-for="recipe in favRecipes"
              :key="recipe.id"
              class="col-6 col-lg-4 mb-2"
            >
              <RecipeCard :recipe="recipe" class="h-100" />
            </div>
          </div>
        </div>
        <div class="recipe-feed">
          <h2 class="h3">Recetas Creadas</h2>
          <div class="row">
            <div
              v-for="recipe in createdRecipes"
              :key="recipe.id"
              class="col-6 col-lg-4 mb-2"
            >
              <RecipeCard :recipe="recipe" class="h-100" />
            </div>
          </div>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  async fetch() {
    const userToken = this.$store.state.user.token
    await this.$store.dispatch('user/getProfile', { userToken })
    await this.$store.dispatch('user/myFavRecipes', { userToken })
    await this.$store.dispatch('user/myCreatedRecipes', { userToken })
  },
  fetchOnServer: false,
  computed: {
    profile() {
      return this.$store.state.user.profile
    },
    favRecipes() {
      return this.$store.state.user.favRecipes
    },
    createdRecipes() {
      return this.$store.state.user.createdRecipes
    },
  },
  methods: {},
}
</script>

<style type="text/css"></style>
