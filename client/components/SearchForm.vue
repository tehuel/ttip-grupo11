/* eslint-disable prettier/prettier */
<template>
  <div>
    <form @submit.prevent="onSubmitSearchForm">
      <p v-if="$fetchState.pending" class="text-center">Cargando...</p>
      <div v-else>
        <b-form-group label="Ingredientes:">
          <b-form-checkbox-group
            v-slot="{ ariaDescribedby }"
            name="ingredients"
            size="lg"
            class="d-flex justify-content-center flex-wrap"
          >
            <b-form-checkbox
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              v-model="selectedIngredients"
              size="lg"
              :value="ingredient.id"
              :aria-describedby="ariaDescribedby"
            >
              {{ ingredient.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Etiquetas:">
          <b-form-checkbox-group
            v-slot="{ ariaDescribedby }"
            name="tags"
            size="lg"
            class="d-flex justify-content-center flex-wrap"
          >
            <b-form-checkbox
              v-for="tag in tags"
              :key="tag.name"
              v-model="selectedTags"
              size="lg"
              :value="tag.id"
              :aria-describedby="ariaDescribedby"
            >
              {{ tag.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <button
          id="search-button"
          type="submit"
          class="btn btn-lg btn-secondary px-3 px-lg-5 mt-3"
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
      selectedIngredients: [],
      selectedTags: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredients.list
    },
    tags() {
      return this.$store.state.tags.list
    },
  },
  fetchOnServer: false,
  activated() {
    // Call fetch again if last fetch more than 60 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    async onSubmitSearchForm() {
      // le paso todos los ingredientes seleccionados a la acción
      return await this.$store.dispatch('search/searchRecipes', {
        ingredients: this.selectedIngredients,
        tags: this.selectedTags,
      })
    },
  },
}
</script>
