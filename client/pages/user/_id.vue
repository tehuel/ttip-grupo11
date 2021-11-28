<template>
  <div class="page">
    <div class="container my-5">
      <b-overlay :show="$fetchState.pending">
        <h1 class="h2 text-center">Perfil de Usuario</h1>
        <pre>{{ profile }}</pre>

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
import UserService from '~/service/user'
import RecipeService from '~/service/recipe'

export default {
  data() {
    return {
      profile: null,
      favRecipes: [],
      createdRecipes: [],
    }
  },
  async fetch() {
    try {
      const userId = this.$route.params.id
      this.profile = await UserService.getProfile(this.$axios, {
        userId,
      })
      if (this.profile.favRecipes.length) {
        this.favRecipes = await RecipeService.searchRecipes(this.$axios, {
          ids: this.profile.favRecipes,
        })
      }
      if (this.profile.createdRecipes.length) {
        this.createdRecipes = await RecipeService.searchRecipes(this.$axios, {
          ids: this.profile.createdRecipes,
        })
      }
    } catch (e) {
      console.error(e)
    }
  },
  fetchOnServer: false,
  computed: {},
  methods: {},
}
</script>
