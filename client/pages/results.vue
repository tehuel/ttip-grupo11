<template>
  <div class="page">
    <div class="container">
      <h1 class="h2 my-5">Resultados</h1>
      <div class="section my-5">
        <div class="row">
          <div v-for="recipe in recipes" :key="recipe._id" class="col-4 mb-2">
            <div class="card">
              <img
                :src="recipe.imgUrl"
                class="card-img-top"
                :alt="recipe.name"
              />
              <div class="card-body">
                <h2 class="h4">{{ recipe.name }}</h2>
                <p>{{ recipe.description }}</p>
                <ul>
                  <li
                    v-for="ingredientId in recipe.ingredients"
                    :key="ingredientId"
                  >
                    {{ ingredient(ingredientId).name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css"></style>

<script>
export default {
  computed: {
    ingredients() {
      return this.$store.state.ingredients.list
    },
    recipes() {
      return this.$store.state.recipes.list
    },
  },
  methods: {
    ingredient(id) {
      return this.ingredients.find((e) => e.id === id)
    },
  },
}
</script>
