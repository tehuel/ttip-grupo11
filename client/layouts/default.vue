<template>
  <div id="app-layout">
    <Navbar></Navbar>

    <div id="app-content" class="container">
      <Nuxt></Nuxt>
    </div>

    <div class="footer bg-primary text-light py-5">
      <div class="container">
        <p>footer</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
}
</script>

<style scoped></style>
