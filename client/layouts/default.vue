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
    const authUser = {
      email: localStorage.getItem('userEmail'),
      token: localStorage.getItem('userToken'),
    }
    console.log('prev user', authUser)
    this.$store.commit('user/setAuthenticated', authUser)
  },
}
</script>
