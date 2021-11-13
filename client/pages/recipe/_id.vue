<template>
  <div class="page">
    <template v-if="recipe">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        style="
          display: block;
          height: 100%;
          max-height: 50vh;
          width: 100%;
          object-fit: cover;
        "
      />
      <div class="container my-5">
        <div class="row">
          <div class="col">
            <h1 class="h2 text-center">{{ recipe.name }}</h1>
            <p class="lead">{{ recipe.description }}</p>
            <h2 class="h3">Instrucciones</h2>
            <template v-for="(step, index) in recipe.instructions">
              <div :key="step" class="recipe-step my-2 py-2 border-bottom">
                <h3 class="h4">
                  Paso {{ index + 1 }}{{ step.title ? `: ${step.title}` : '' }}
                </h3>
                <div class="recipe-step-content">
                  <img v-if="step.image" :src="step.image" />
                  <p>{{ step.description }}</p>
                </div>
              </div>
            </template>
          </div>
          <div class="col col-lg-4">
            <b-card class="mb-2">
              <h2 class="lead">Ficha Técnica</h2>
              <p>Creada el {{ recipe.createdAt }} por {{ recipe.user }}</p>
              <pre>{{ recipe.ingredients }}</pre>
            </b-card>
          </div>
        </div>
        <RecipeComments></RecipeComments>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
    await this.$store.dispatch('recipes/getSingleRecipe', {
      id: this.$route.params.id,
    })
    await this.$store.dispatch('comments/getComments', {
      recipe: this.$route.params.id,
    })
  },
  fetchOnServer: false,
  computed: {
    recipe() {
      return this.$store.state.recipes.single
    },
    comments() {
      return this.$store.state.comments.list
    },
  },
}
</script>

<style type="text/css"></style>
