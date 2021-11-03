<template>
  <div class="page">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col col-md-10 col-lg-8">
          <div class="card shadow-lg">
            <div class="card-body">
              <h1 class="h2 text-center">Registrar Nuevo Usuario</h1>
              <template v-if="error">
                <b-alert show variant="danger" class="my-5">
                  Hubo un error en el registro.
                </b-alert>
              </template>
              <template v-else>
                <p>
                  Completá el formulario para registrar un nuevo usuario y
                  acceder a todas las funciones del sitio.
                </p>
                <b-form
                  class="my-5"
                  @submit.stop.prevent="onSubmitRegisterForm"
                >
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
                  Tal vez querías
                  <NuxtLink to="/login">iniciar sesión</NuxtLink>?
                </p>
              </template>
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
      error: null,
      form: {
        email: 'admin@example.com',
        password: 'password',
      },
    }
  },
  methods: {
    async onSubmitRegisterForm() {
      try {
        await this.$store.dispatch('user/register', this.form)
      } catch (e) {
        // console.error('error en onSubmitRegisterForm', e)
        // this.$nuxt.error('eee')
        this.error = true
      }
    },
  },
}
</script>

<style type="text/css"></style>
