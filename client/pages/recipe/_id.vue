<template>
  <div class="page">
    <BOverlay :show="$fetchState.pending">
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
          <!-- Edit -->
          <RecipeForm
            v-show="editing"
            :recipe="recipe"
            @submit="onSubmitEditRecipe"
            @reset="editing = false"
          ></RecipeForm>

          <!-- View -->
          <div v-show="!editing" class="row">
            <div class="col">
              <h1 class="h2 text-center">{{ recipe.name }}</h1>
              <p class="lead">{{ recipe.description }}</p>
              <h2 class="h3">Instrucciones</h2>
              <RecipeStep
                v-for="(step, index) in filteredSteps"
                :key="JSON.stringify(step)"
                :step="step"
                :index="index"
              ></RecipeStep>
            </div>
            <div class="col-12 col-lg-4">
              <b-card class="mb-2 sticky-top">
                <b-button
                  v-if="canEditRecipe"
                  class="mb-2"
                  block
                  variant="primary"
                  @click="editRecipe"
                >
                  Editar receta
                </b-button>

                <b-button
                  v-if="canEditRecipe"
                  class="mb-2"
                  block
                  variant="danger"
                  @click="onSubmitDeleteRecipe"
                >
                  Eliminar receta
                </b-button>

                <h2 class="lead">Ficha Técnica</h2>
                <p>
                  Creada el {{ formattedDate }} por
                  <ProfileName :user-id="recipe.user"></ProfileName>
                </p>

                <RecipeRatingForm :recipe="recipe"></RecipeRatingForm>

                <p class="lead mt-3">Ingredientes:</p>
                <RecipeIngredientsList
                  :ingredients="recipe.ingredients"
                ></RecipeIngredientsList>

                <RecipeFavButton
                  v-if="canFavRecipe"
                  :recipe="recipe"
                ></RecipeFavButton>
              </b-card>
            </div>
          </div>
        </div>

        <!-- RecipeComments -->
        <div class="py-5 bg-light border-top">
          <div class="container my-2">
            <RecipeComments
              :recipe="recipe"
              :comments="comments"
            ></RecipeComments>
          </div>
        </div>
      </template>
    </BOverlay>
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
  computed: {
    formattedDate() {
      const formatter = new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
      return formatter.format(this.recipe.createdAt)
    },
    filteredSteps() {
      const steps = this.recipe?.instructions || []
      return steps.filter((step) => {
        return step.title || step.description
      })
    },
    canEditRecipe() {
      return this.recipe.user === this.$store.state.user.id
    },
    canFavRecipe() {
      return this.$store.state.user.id && !this.canEditRecipe
    },
  },
  activated() {
    this.recipe = null
    this.editing = false
    this.$fetch()
  },
  fetchOnServer: false,
  methods: {
    editRecipe() {
      this.editing = true
    },
    async onSubmitEditRecipe({ recipe }) {
      try {
        const userToken = this.$store.state.user.token
        await this.$store.dispatch('recipes/update', {
          recipe,
          userToken,
        })
        this.$bvToast.toast('Receta Actualizada correctamente', {
          title: 'Receta Actualizada',
          variant: 'success',
          appendToast: true,
          solid: true,
        })
        await this.$router.push('/')
      } catch (e) {
        this.$bvToast.toast('Error Editando la Receta', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      }
      this.editing = false
    },
    async onSubmitDeleteRecipe() {
      try {
        const userToken = this.$store.state.user.token
        const recipeId = this.$route.params.id

        await this.$store.dispatch('recipes/delete', {
          id: recipeId,
          userToken,
        })
        this.$bvToast.toast('Receta Eliminada correctamente', {
          title: 'Receta Eliminada',
          variant: 'success',
          appendToast: true,
          solid: true,
        })
        await this.$router.push('/')
      } catch (e) {
        this.$bvToast.toast('Error Editando la Receta', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      }
      this.$set(this, 'editing', false)
    },
    onResetEditRecipe() {
      this.editing = false
    },
  },
}
</script>

<style type="text/css"></style>
