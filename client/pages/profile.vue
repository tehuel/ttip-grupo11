<template>
  <div class="page">
    <div class="container my-5">
      <h1 class="h2 text-center">Perfil de Usuario</h1>
      <pre>{{ profile }}</pre>
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
    profile() {
      return this.$store.state.user.profile
    },
  },
  methods: {},
}
</script>

<style type="text/css"></style>
