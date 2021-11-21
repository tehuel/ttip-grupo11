<template>
  <div class="recipe-rating-form">
    <form @submit.prevent="onSubmitRateForm">
      <b-form-rating
        v-model="rating"
        show-value
        show-value-max
        no-border
      ></b-form-rating>
      <template v-if="editing">
        <b-btn variant="primary" type="submit">Calificar</b-btn>
        <b-btn variant="light" @click="onResetRateForm">Cancelar</b-btn>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  data() {
    return {
      editing: false,
      currentRating: null,
    }
  },
  async fetch() {},
  fetchOnServer: false,
  computed: {
    rating: {
      get() {
        return this.currentRating || this.recipe.avgRating
      },
      set(value) {
        this.editing = true
        this.currentRating = value
      },
    },
  },
  methods: {
    onSubmitRateForm() {
      this.editing = false
    },
    onResetRateForm() {
      this.editing = false
      this.currentRating = null
    },
  },
}
</script>
