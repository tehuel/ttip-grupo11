<template>
  <div>
    <form @submit.prevent="onSubmitCommentForm">
      <b-form-group label="Comentario:">
        <b-form-textarea
          id="comment"
          v-model="comment"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <div class="d-flex w-100 justify-content-end">
        <button
          id="search-button"
          type="submit"
          class="btn btn-secondary px-3 px-lg-5"
        >
          Agregar Comentario
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
  props: ['recipe'],
  data() {
    return {
      comment: null,
      name: null,
    }
  },
  methods: {
    async onSubmitCommentForm() {
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('comments/addComment', {
        recipe: this.recipe,
        text: this.comment,
        userToken,
      })
      this.comment = null
      this.$bvToast.toast('Comentario enviado correctamente', {
        title: 'Comentario Enviado',
        variant: 'success',
        appendToast: true,
        solid: true,
      })
    },
  },
}
</script>
