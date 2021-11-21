<template>
  <b-card no-body class="recipe-comments">
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
        Tenés que <NuxtLink to="/login">iniciar sesión</NuxtLink> para poder
        agregar comentarios.
      </p>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  data() {
    return {}
  },
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
