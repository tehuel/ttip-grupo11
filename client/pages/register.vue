<template>
  <div id="register-page">
    <ContainersForm title="Registrar Nuevo Usuario">
      <b-overlay :show="loading">
        <template v-if="error">
          <b-alert show variant="danger" class="my-5">
            <p>Hubo un error en el registro.</p>
            <hr />
            <b-button variant="danger" block @click.stop.prevent="resetError">
              Reintentar
            </b-button>
          </b-alert>
        </template>
        <template v-else>
          <p>
            Completá el formulario para registrar un nuevo usuario y acceder a
            todas las funciones del sitio.
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
            Tal vez querías
            <NuxtLink to="/login">iniciar sesión</NuxtLink>?
          </p>
        </template>
      </b-overlay>
    </ContainersForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      form: {
        email: 'admin@example.com',
        password: 'password',
      },
    }
  },
  activated() {
    this.resetError()
  },
  methods: {
    async onSubmitRegisterForm() {
      try {
        this.loading = true
        await this.$store.dispatch('user/register', this.form)
      } catch (e) {
        this.error = true
      }
      setTimeout(() => {
        this.loading = false
      }, 350)
    },
    resetError() {
      this.error = null
    },
  },
}
</script>

<style type="text/css"></style>
