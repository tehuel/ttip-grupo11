<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
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
          <NuxtLink class="nav-link" active-class="active" to="/about">
            Acerca de
          </NuxtLink>
          <NuxtLink
            v-if="isAuthenticated"
            class="nav-link"
            active-class="active"
            to="/recipe/create"
          >
            Crear Receta
          </NuxtLink>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="isAuthenticated">
            <b-nav-item-dropdown :text="userEmail" right>
              <NuxtLink
                class="dropdown-item"
                active-class="active"
                to="/profile"
              >
                Perfil de Usuario
              </NuxtLink>
              <b-dropdown-item @click="onUserLogout">
                Cerrar Sesión
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <NuxtLink class="nav-link" active-class="active" to="/login">
              Iniciar Sesión
            </NuxtLink>
            <NuxtLink class="nav-link" active-class="active" to="/register">
              Registrarse
            </NuxtLink>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return Boolean(this.$store.state.user.token)
    },
    userEmail() {
      return this.$store.state.user.email
    },
  },
  methods: {
    onUserLogout() {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>

<style scoped>
#app-iso {
  max-height: 34px;
}
</style>
