<template>
  <div class="page">
    <template v-if="recipe">
      <img
        v-if="recipe.image"
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
                <h3 class="h4 py-2 sticky-top bg-white">
                  Paso {{ index + 1 }}{{ step.title ? `: ${step.title}` : '' }}
                </h3>
                <div class="recipe-step-content">
                  <b-img v-if="step.image" fluid-grow :src="step.image" />
                  <p>{{ step.description }}</p>
                </div>
              </div>
            </template>
          </div>
          <div class="col col-lg-4">
            <b-card class="mb-2 sticky-top">
              <h2 class="lead">Ficha Técnica</h2>
              <p>Creada el {{ formattedDate }} por {{ recipe.user }}</p>

              <RecipeRatingForm :recipe="recipe"></RecipeRatingForm>

              <p class="lead mt-3">Ingredientes:</p>
              <RecipeIngredientsList
                :ingredients="recipe.ingredients"
              ></RecipeIngredientsList>
              <button
                v-if="!isRecipeInFavourites"
                id="search-button"
                class="btn btn-lg btn-secondary px-3 px-lg-5 mt-3"
                @click="onClickAddRecipeToFavourites"
              >
                Agregar a favoritas
              </button>
            </b-card>
          </div>
        </div>
        <pre>{{ recipe }}</pre>
      </div>
      <div class="py-5 bg-light border-top">
        <div class="container my-2">
          <RecipeComments></RecipeComments>
        </div>
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
    isRecipeInFavourites() {
      const recipeId = this.$route.params.id
      const favourites = this.$store.state.user.profile?.favRecipes || []
      return favourites.includes(recipeId)
    },
    formattedDate() {
      const formatter = new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
      return formatter.format(this.recipe.createdAt)
    },
  },
  methods: {
    async onClickAddRecipeToFavourites() {
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('user/addRecipeToFavourites', {
        recipe: this.recipe,
        userToken,
      })
    },
  },
}
</script>

<style type="text/css"></style>
