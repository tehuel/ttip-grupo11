<template>
  <div class="recipe-ingredients-list">
    <ul>
      <li
        v-for="ingredient in filteredIngredients"
        :key="ingredient"
        class="recipe-ingredient-list-item"
      >
        {{ ingredient }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    filteredIngredients() {
      return this.ingredients
        .map((i) => {
          const { ingredient, quantity } = i
          const name =
            this.$store.getters['ingredients/getIngredientById'](
              ingredient
            )?.name

          if (!name || !quantity) {
            return null
          }
          return `${name}, ${quantity}`
        })
        .filter(Boolean)
    },
  },
}
</script>
