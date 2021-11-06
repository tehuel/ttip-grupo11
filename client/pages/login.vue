<template>
  <div class="page">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col col-md-10 col-lg-8">
          <div class="card shadow-lg">
            <div class="card-body">
              <h1 class="h2 text-center">Iniciar Sesión</h1>
              <b-form class="my-5" @submit.stop.prevent="onSubmitLoginForm">
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
                  Iniciar Sesión
                </b-button>
              </b-form>
              <p class="text-muted">
                Tal vez querías
                <NuxtLink to="/register">registrar un nuevo usuario</NuxtLink>?
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
  methods: {
    async onSubmitLoginForm() {
      await this.$store.dispatch('user/authenticate', this.form)
    },
  },
}
</script>

<style type="text/css"></style>
