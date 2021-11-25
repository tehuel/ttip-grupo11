<template>
  <div class="recipe-ingredients-list">
    <ul>
      <li
        v-for="ingredientItem in ingredients"
        :key="ingredientItem.ingredient"
        class="recipe-ingredient-list-item"
      >
        {{ getFormattedIngredient(ingredientItem) }}
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
  computed: {},
  methods: {
    getIngredientById(id) {
      return this.$store.getters['ingredients/getIngredientById'](id)
    },
    getFormattedIngredient(ingredient) {
      const name = this.getIngredientById(ingredient.ingredient)?.name
      return `${name}, ${ingredient.quantity}`
    },
  },
}
</script>
