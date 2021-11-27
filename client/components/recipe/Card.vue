<template>
  <b-card no-body class="recipe-card">
    <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.id } }">
      <img :src="recipe.image" class="card-img-top" :alt="recipe.name" />
    </NuxtLink>
    <b-card-body>
      <h2 class="h4">{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>

      <RecipeRatingForm :recipe="recipe"></RecipeRatingForm>

      <p>Ingredientes:</p>
      <RecipeIngredientsList
        :ingredients="recipe.ingredients"
      ></RecipeIngredientsList>

      <template v-if="recipe.tags.length">
        <p>Tags:</p>
        <ul>
          <li v-for="tagId in recipe.tags" :key="tagId">
            {{ tag(tagId) ? tag(tagId).name : '' }}
          </li>
        </ul>
      </template>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
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
