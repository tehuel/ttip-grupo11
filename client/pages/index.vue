<template>
  <div class="page">
    <div class="search shadow">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-10 col-lg-8">
            <div class="card shadow-lg">
              <div class="card-body">
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ContainersSection title="Ultimas Recetas">
      <RecipeFeed />
    </ContainersSection>

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
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
    await this.$store.dispatch('recipes/getLatestRecipes')
  },
  fetchOnServer: false,
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
