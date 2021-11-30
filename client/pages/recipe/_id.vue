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
        <template v-if="editing">
          <RecipeForm
            :recipe="recipe"
            @submit="finishEditingRecipe"
          ></RecipeForm>
        </template>
        <template v-else>
          <div class="row">
            <div class="col">
              <h1 class="h2 text-center">{{ recipe.name }}</h1>
              <p class="lead">{{ recipe.description }}</p>
              <b-button @click="editRecipe">Editar receta</b-button>
              <h2 class="h3">Instrucciones</h2>
              <template v-for="(step, index) in recipe.instructions">
                <div
                  :key="step.description"
                  class="recipe-step my-2 py-2 border-bottom"
                >
                  <h3 class="h4 py-2 sticky-top bg-white">
                    Paso {{ index + 1
                    }}{{ step.title ? `: ${step.title}` : '' }}
                  </h3>
                  <div class="recipe-step-content">
                    <b-img v-if="step.image" fluid-grow :src="step.image" />
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </template>
            </div>
            <div class="col-12 col-lg-4">
              <b-card class="mb-2 sticky-top">
                <h2 class="lead">Ficha Técnica</h2>
                <p>
                  Creada el {{ formattedDate }} por
                  <NuxtLink
                    :to="{ name: 'user-id', params: { id: recipe.user } }"
                  >
                    {{ recipe.user }}
                  </NuxtLink>
                </p>

                <RecipeRatingForm :recipe="recipe"></RecipeRatingForm>

                <p class="lead mt-3">Ingredientes:</p>
                <RecipeIngredientsList
                  :ingredients="recipe.ingredients"
                ></RecipeIngredientsList>

                <RecipeFavButton :recipe="recipe"></RecipeFavButton>
              </b-card>
            </div>
          </div>
        </template>
      </div>
      <div class="py-5 bg-light border-top">
        <div class="container my-2">
          <RecipeComments
            :recipe="recipe"
            :comments="comments"
          ></RecipeComments>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import RecipeService from '~/service/recipe'
import CommentService from '~/service/comment'

export default {
  data() {
    return {
      editing: false,
      recipe: null,
      comments: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')

    const recipeId = this.$route.params.id
    this.recipe = await RecipeService.getSingleRecipe(this.$axios, {
      id: recipeId,
    })
    this.comments = await CommentService.getComments(this.$axios, {
      skip: 0,
      limit: 999,
      recipe: recipeId,
    })
  },
  fetchOnServer: false,
  computed: {
    formattedDate() {
      const formatter = new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
      return formatter.format(this.recipe.createdAt)
    },
    canEditRecipe() {
      return this.recipe.user.id === this.$store.state.user.id
    },
  },
  methods: {
    editRecipe() {
      this.editing = true
    },
    finishEditingRecipe() {
      this.editing = false
    },
  },
}
</script>

<style type="text/css"></style>
