<template>
  <div>
    <form>
      <p v-if="$fetchState.pending">Cargando...</p>
      <div v-else>
        <b-form-checkbox-group
          v-slot="{ ariaDescribedby }"
          name="ingredients"
          size="lg"
          class="d-flex justify-content-center"
        >
          <b-form-checkbox
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            v-model="selected"
            size="lg"
            :value="ingredient"
            :aria-describedby="ariaDescribedby"
          >
            {{ ingredient.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <button
          type="submit"
          class="btn btn-lg btn-primary px-5"
          :disabled="$fetchState.pending"
        >
          Buscar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'IngredientsList',
  data() {
    return {
      selected: [], // Must be an array reference!
    }
  },
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredients.list
    },
  },
  fetchOnServer: false,
}
</script>
