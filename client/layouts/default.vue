<template>
  <div id="app-layout">
    <Navbar />

    <div id="app-content">
      <Nuxt keep-alive />
    </div>

    <Foot />
  </div>
</template>

<script>
export default {
  name: 'Default',
  mounted() {
    // si existe usuario en localStorage, lo levanto
    if (localStorage.getItem('userId')) {
      const authUser = {
        id: localStorage.getItem('userId'),
        email: localStorage.getItem('userEmail'),
        token: localStorage.getItem('userToken'),
      }
      this.$store.commit('user/setAuthenticated', authUser)
      this.$store.dispatch('user/getProfile', {
        userId: authUser.id,
      })
    }
  },
}
</script>
