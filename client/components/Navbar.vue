<template>
  <b-navbar toggleable="lg" type="light" variant="primary">
    <div class="container">
      <b-navbar-brand href="#">
        <img
          id="app-iso"
          src="~/assets/img/recetaris-iso@2x.png"
          class="d-inline-block"
          alt="Recetaris"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
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
#app-logo {
  width: 36px;
  height: 36px;
}
#app-iso {
  max-height: 36px;
}
</style>
