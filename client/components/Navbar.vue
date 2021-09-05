<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <div class="container">
      <NuxtLink class="navbar-brand" active-class="nav-link-active" to="/">
        <img
          id="app-iso"
          src="~/assets/img/recetaris-iso@2x.png"
          class="d-inline-block"
          alt="Recetaris"
        />
      </NuxtLink>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <NuxtLink class="nav-link" active-class="active" to="/about"
            >Acerca de</NuxtLink
          >
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
#app-iso {
  max-height: 34px;
}
</style>
