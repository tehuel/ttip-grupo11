<template>
  <div class="recipe-feed">
    <transition-group name="list" tag="div" class="row">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="transition-col col-6 col-lg-4 mb-2"
      >
        <RecipeCard :recipe="recipe" class="h-100" />
      </div>
    </transition-group>
    <b-alert v-if="allRecipes" variant="light" show>
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
      {{ loadingRecipes ? 'Cargando...' : 'Cargar Más' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastLength: false,
      allRecipes: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('recipes/getLatestRecipes')

    // consulto si no hay más recetas para traer
    const newLength = this.$store.state.recipes.latest.length
    this.allRecipes = newLength === this.lastLength
    this.lastLength = newLength
  },
  fetchOnServer: false,
  computed: {
    loadingRecipes() {
      return this.$fetchState.pending
    },
    recipes() {
      return this.$store.state.recipes.latest
    },
  },
  methods: {
    loadMoreRecipes() {
      this.$fetch()
    },
  },
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
