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
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
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
