<template>
  <div class="page">
    <div class="container my-5">
      <template v-if="recipe">
        <img :src="recipe.imgUrl" class="card-img-top" :alt="recipe.name" />
        <h1 class="h2 text-center">{{ recipe.name }}</h1>
        <p class="lead">{{ recipe.description }}</p>
        <b-card>
          <b-card-body>
            <h2 class="h2">Comentarios</h2>
            <hr />
          </b-card-body>
        </b-card>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('recipes/getSingleRecipe', {
      id: this.$route.params.id,
    })
  },
  fetchOnServer: false,
  computed: {
    recipe() {
      return this.$store.state.recipes.single
    },
  },
}
</script>

<style type="text/css"></style>
