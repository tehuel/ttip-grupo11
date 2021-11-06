<template>
  <div class="page">
    <div class="container my-5">
      <h1 class="h2 text-center">Perfil de Usuario</h1>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  computed: {
    isAuthenticated() {
      return Boolean(this.$store.state.user.token)
    },
    userEmail() {
      return this.$store.state.user.email
    },
  },
  methods: {
    async onSubmitLoginForm() {
      await this.$store.dispatch('user/authenticate', this.form)
    },
  },
}
</script>

<style type="text/css"></style>
