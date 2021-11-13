/* eslint-disable prettier/prettier */
<template>
  <div class="card">
    <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.id } }">
      <img :src="recipe.image" class="card-img-top" :alt="recipe.name" />
    </NuxtLink>
    <div class="card-body">
      <h2 class="h4">{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <b-form-rating
        :value="recipe.avgRating"
        readonly
        show-value
        disabled
        show-value-max
        no-border
      ></b-form-rating>
      <p>Ingredientes:</p>
      <RecipeIngredientsList
        :ingredients="recipe.ingredients"
      ></RecipeIngredientsList>
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
    tag(id) {
      return this.$store.getters['tags/getTagById'](id)
    },
  },
}
</script>
