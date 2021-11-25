<template>
  <div class="recipe-rating-form">
    <b-overlay :show="showLoading">
      <form @submit.prevent="onSubmitRateForm">
        <b-form-rating
          v-model="rating"
          :readonly="!isAuthenticated"
          show-value
          show-value-max
          no-border
        ></b-form-rating>
        <template v-if="editing">
          <b-btn variant="primary" type="submit">Calificar</b-btn>
          <b-btn variant="light" @click="onResetRateForm">Cancelar</b-btn>
        </template>
      </form>
    </b-overlay>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  data() {
    return {
      editing: false,
      currentRating: null,
      showLoading: false,
    }
  },
  async fetch() {},
  fetchOnServer: false,
  computed: {
    isAuthenticated() {
      return Boolean(this.$store.state.user.token)
    },
    rating: {
      get() {
        return this.currentRating || this.recipe.avgRating
      },
      set(value) {
        this.editing = Boolean(value)
        this.currentRating = value
      },
    },
  },
  methods: {
    async onSubmitRateForm() {
      this.showLoading = true
      this.editing = false

      const userToken = this.$store.state.user.token
      await this.$store.dispatch('recipes/rate', {
        rating: this.currentRating,
        id: this.recipe.id,
        userToken,
      })

      // await action
      this.showLoading = false
    },
    onResetRateForm() {
      this.currentRating = null
      this.editing = false
    },
  },
}
</script>
