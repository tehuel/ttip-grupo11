<template>
  <div class="page">
    <div class="container">
      <h1 class="h2 my-5">Resultados</h1>
      <div class="section my-5">
        <div class="row">
          <div
            v-for="recipe in recipes"
            :key="recipe._id"
            class="col-6 col-lg-4 mb-2"
          >
            <RecipeCard :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ingredients() {
      return this.$store.state.ingredients.list
    },
    recipes() {
      return this.$store.state.recipes.searchResults
    },
  },
  methods: {
    ingredient(id) {
      return this.ingredients.find((e) => e.id === id)
    },
  },
}
</script>

<style type="text/css"></style>
