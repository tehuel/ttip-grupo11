<template>
  <div class="page">
    <div class="container my-5">
      <h1>Crear Nueva Receta</h1>
      <p>Completá el formulario para agregar tu receta a Recetaris</p>

      <RecipeForm
        create
        @submit="onSubmitCreateRecipe"
        @reset="onResetCreateRecipe"
      ></RecipeForm>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async onSubmitCreateRecipe({ recipe }) {
      try {
        const userToken = this.$store.state.user.token
        await this.$store.dispatch('recipes/create', {
          userToken,
          recipe,
        })
        this.$bvToast.toast('Receta Creada correctamente', {
          title: 'Receta Creada',
          variant: 'success',
          appendToast: true,
          solid: true,
        })
        await this.$router.push('/')
      } catch (e) {
        this.$bvToast.toast('Error Cargando la Receta', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      }
    },
    onResetCreateRecipe() {
      console.log('reset')
    },
  },
}
</script>

<style type="text/css"></style>
