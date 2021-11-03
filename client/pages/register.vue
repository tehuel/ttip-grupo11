<template>
  <div class="page">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col col-md-10 col-lg-8">
          <div class="card shadow-lg">
            <div class="card-body">
              <h1 class="h2 text-center">Registrar Nuevo Usuario</h1>
              <p>
                Completá el formulario para registrar un nuevo usuario y acceder
                a todas las funciones del sitio.
              </p>
              <b-form class="my-5" @submit.stop.prevent="onSubmitRegisterForm">
                <b-form-group
                  id="input-group-email"
                  label="Email:"
                  label-for="input-email"
                >
                  <b-form-input
                    id="input-email"
                    v-model="form.email"
                    type="email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-password"
                >
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">
                  Registrar Usuario
                </b-button>
              </b-form>
              <p class="text-muted">
                Tal vez querías <NuxtLink to="/login">iniciar sesión</NuxtLink>?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: 'admin@example.com',
        password: 'password',
      },
    }
  },
  async fetch() {
    // await this.$store.dispatch('ingredients/getIngredients')
    // await this.$store.dispatch('tags/getTags')
    // await this.$store.dispatch('recipes/getLatestRecipes')
  },
  // fetchOnServer: false,
  methods: {
    onSubmitRegisterForm() {
      console.log('register', this.form)
      // le paso todos los ingredientes seleccionados a la acción
      // return await this.$store.dispatch('search/searchRecipes', {
      //   ingredients: this.selectedIngredients,
      //   tags: this.selectedTags,
      // })
    },
  },
}
</script>

<style type="text/css"></style>
