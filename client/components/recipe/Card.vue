<template>
  <b-card no-body class="recipe-card">
    <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.id } }">
      <img
        v-if="recipe.image"
        :src="recipe.image"
        class="card-img-top"
        :alt="recipe.name"
      />
      <img
        v-else
        src="~/assets/img/placeholder.png"
        class="card-img-top"
        :alt="recipe.name"
      />
    </NuxtLink>
    <b-card-body>
      <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.id } }">
        <h2 class="h4">{{ recipe.name }}</h2>
      </NuxtLink>
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

<style lang="scss">
.recipe-card {
  max-height: 700px;
  overflow: hidden;
}
</style>
