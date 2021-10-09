<template>
  <div class="page">
    <div class="search shadow">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-10 col-lg-8">
            <div class="card shadow-lg">
              <div class="card-body">
                <h1 class="h3">Seleccioná los ingredientes</h1>
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-5">
      <p class="h2">Ultimas Recetas</p>
      <div class="row">
        <div
          v-for="recipe in latestRecipes"
          :key="recipe._id"
          class="col-6 col-lg-4 mb-2"
        >
          <RecipeCard :recipe="recipe" />
        </div>
      </div>
    </div>
    <div class="container my-5">
      <p class="h2">Lorem ipsum</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        amet, delectus ea eius eum illo inventore iusto laudantium modi
        molestias, possimus ratione sed similique tempore tenetur vel, voluptas.
        Deserunt, dolore.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('recipes/getLatestRecipes')
  },
  computed: {
    latestRecipes() {
      return this.$store.state.recipes.latest
    },
  },
}
</script>

<style type="text/css">
.search {
  padding: 6em 0;
  background: url('./assets/img/bg.jpg');
  background-size: cover;
  object-fit: contain;
}
</style>
