<template>
  <div class="fav-button">
    <b-overlay :show="isLoading">
      <button
        v-if="!isRecipeInFavourites"
        class="btn btn-secondary btn-block"
        @click="onClickAddRecipeToFavourites"
      >
        Agregar a favoritas
      </button>
      <button
        v-else
        class="btn btn-outline-danger btn-block"
        @click="onClickRemoveRecipeFromFavourites"
      >
        Eliminar de Favoritos
      </button>
    </b-overlay>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    isRecipeInFavourites() {
      const favRecipes = this.$store.state.user.profile?.favRecipes
      return favRecipes.includes(this.recipe.id)
    },
  },
  methods: {
    async onClickAddRecipeToFavourites() {
      this.isLoading = true
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('user/addRecipeToFavourites', {
        recipeId: this.recipe.id,
        userToken,
      })
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
    onClickRemoveRecipeFromFavourites() {
      this.isLoading = true
      // TODO
      // const userToken = this.$store.state.user.token
      // await this.$store.dispatch('user/addRecipeToFavourites', {
      //   recipe: this.recipe,
      //   userToken,
      // })
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
  },
}
</script>
