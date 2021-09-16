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
}
</script>
