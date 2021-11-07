<template>
  <div class="page">
    <template v-if="recipe">
      <img
        :src="recipe.imgUrl"
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
        <h1 class="h2 text-center">{{ recipe.name }}</h1>
        <p class="lead">{{ recipe.description }}</p>
        <b-card no-body>
          <b-card-body class="p-3">
            <h2 class="h3">Comentarios</h2>
            <template v-if="comments.length">
              <CommentCard
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
              ></CommentCard>
            </template>
            <p v-else>Todavía no hay comentarios para esta receta.</p>
          </b-card-body>
          <b-card-footer>
            <template v-if="$store.state.user.token">
              <CommentForm :recipe="recipe.id"></CommentForm>
            </template>
            <p v-else class="m-0">
              Tenés que <NuxtLink to="/login">iniciar sesión</NuxtLink> para
              poder agregar comentarios.
            </p>
          </b-card-footer>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  async fetch() {
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
