<template>
  <div class="page">
    <div class="container my-5">
      <h1 class="h2 text-center">Perfil de Usuario: {{ profile.email }}</h1>
      <pre>{{ profile }}</pre>
      <div class="recipe-feed">
        <transition-group name="list" tag="div" class="row">
          <div
            v-for="recipe in favRecipes"
            :key="recipe.id"
            class="transition-col col-6 col-lg-4 mb-2"
          >
            <RecipeCard :recipe="recipe" class="h-100" />
          </div>
        </transition-group>
        <!--         <b-alert v-if="allRecipes" variant="light" show>
          No hay más recetas para mostrar
        </b-alert>
        <button
          v-else
          id="load-more-button"
          type="button"
          class="btn btn-lg btn-secondary px-3 px-lg-5 mt-3"
          :disabled="loadingRecipes || allRecipes"
          @click="loadMoreRecipes"
        >
          {{ loadingRecipes ? 'Cargando...' : 'Mas recetas favoritas' }}
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  computed: {
    isAuthenticated() {
      return Boolean(this.$store.state.user.token)
    },
    profile() {
      return this.$store.state.user.profile
    },
    favRecipes() {
      return this.$store.state.user.favRecipes
    },
  },
  methods: {},
}
</script>

<style type="text/css"></style>
