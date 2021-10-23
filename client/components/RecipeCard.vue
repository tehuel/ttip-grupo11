/* eslint-disable prettier/prettier */
<template>
  <div class="card">
    <img :src="recipe.imgUrl" class="card-img-top" :alt="recipe.name" />
    <div class="card-body">
      <h2 class="h4">{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <b-form-rating
        :value="recipe.rating"
        readonly
        show-value
        disabled
        show-value-max
        no-border
      ></b-form-rating>
      <p>Ingredientes:</p>
      <ul>
        <li v-for="ingredientId in recipe.ingredients" :key="ingredientId">
          {{ ingredient(ingredientId) ? ingredient(ingredientId).name : '' }}
        </li>
      </ul>
      <p>Tags:</p>
      <ul>
        <li v-for="tagId in recipe.tags" :key="tagId">
          {{ tag(tagId) ? tag(tagId).name : '' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ingredient(id) {
      return this.$store.getters['ingredients/getIngredientById'](id)
    },
    tag(id) {
      return this.$store.getters['tags/getTagById'](id)
    },
  },
}
</script>
