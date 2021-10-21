/* eslint-disable prettier/prettier */
<template>
  <div>
    <h2 class="h2">Ultimas Recetas</h2>
    <transition-group name="list" tag="div" class="row">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="transition-col col-6 col-lg-4 mb-2"
      >
        <RecipeCard :recipe="recipe" />
      </div>
    </transition-group>
    <button
      id="load-more-button"
      type="button"
      class="btn btn-lg btn-secondary px-3 px-lg-5 mt-3"
      :disabled="loadingRecipes"
      @click="loadMoreRecipes"
    >
      {{ loadingRecipes ? 'Cargando...' : 'Cargar Más' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'RecipeFeed',
  computed: {
    loadingRecipes() {
      return this.$store.state.recipes.loading
    },
    recipes() {
      return this.$store.state.recipes.latest
    },
  },
  methods: {
    loadMoreRecipes() {
      return this.$store.dispatch('recipes/getLatestRecipes')
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
