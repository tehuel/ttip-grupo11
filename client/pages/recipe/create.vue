<template>
  <div class="page">
    <div class="container my-5">
      <h1>Crear Nueva Receta</h1>
      <p>Completá el formulario para agregar tu receta a Recetaris</p>
      <b-form>
        <b-form-group label="Nombre:">
          <b-form-input v-model="name" type="text" />
        </b-form-group>
        <b-form-group label="Descripción:">
          <b-form-input v-model="description" type="text" />
        </b-form-group>
        <b-form-group label="Imagen:">
          <b-form-input v-model="image" type="text" />
        </b-form-group>
        <b-form-group label="Etiquetas:">
          <b-form-checkbox-group
            v-slot="{ ariaDescribedby }"
            name="tags"
            class="d-flex justify-content-center flex-wrap"
          >
            <b-form-checkbox
              v-for="tag in tagsList"
              :key="tag.name"
              v-model="tags"
              :value="tag.id"
              :aria-describedby="ariaDescribedby"
            >
              {{ tag.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <hr />
        <h2>Ingredientes</h2>
        <ul v-if="ingredients">
          <li
            v-for="(ingredient, index) in ingredients"
            :key="ingredient"
            class="d-flex"
          >
            <b-form-group label="Cantidad:">
              <b-form-input v-model="ingredients[index].quantity" type="text" />
            </b-form-group>
            <tags-input
              v-model="ingredients[index].ingredient"
              :element-id="`ingredients-${index}`"
              :existing-tags="ingredientsList"
              id-field="id"
              text-field="name"
              :typeahead="true"
              :typeahead-hide-discard="true"
              limit="1"
              placeholder="Ingrese nombre de ingrediente..."
            ></tags-input>
            <b-btn
              v-if="ingredients.length > 1"
              variant="outline-danger"
              @click="deleteIngredient(index)"
            >
              Eliminar
            </b-btn>
          </li>
        </ul>
        <b-btn @click="addIngredient">Agregar Ingrediente</b-btn>
        <hr />
        <h2>Instrucciones</h2>
        <ul v-if="instructions">
          <li v-for="(instruction, index) in instructions" :key="instruction">
            <b-form-group label="Titulo:">
              <b-form-input v-model="instructions[index].title" type="text" />
            </b-form-group>
            <b-form-group label="Descripción:">
              <b-form-input
                v-model="instructions[index].description"
                type="text"
              />
            </b-form-group>
            <b-form-group label="Imagen:">
              <b-form-input v-model="instructions[index].image" type="text" />
            </b-form-group>
          </li>
        </ul>
        <b-btn @click="addInstruction">Agregar Paso</b-btn>
        <hr />
        <b-btn type="submit">Enviar</b-btn>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      image: '',
      tags: [],
      ingredients: [
        {
          quantity: '',
          ingredient: null,
        },
      ],
      instructions: [
        {
          title: null,
          description: null,
          image: null,
        },
      ],
    }
  },
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
  },
  fetchOnServer: false,
  computed: {
    tagsList() {
      return this.$store.state.tags.list
    },
    ingredientsList() {
      return this.$store.state.ingredients.list
    },
  },
  methods: {
    addIngredient() {
      this.ingredients.push({
        quantity: '',
        ingredient: null,
      })
    },
    deleteIngredient(index) {
      this.ingredients.splice(index, 1)
    },
    addInstruction() {
      this.instructions.push({
        title: null,
        description: null,
        image: null,
      })
    },
    deleteInstruction(index) {
      this.instructions.splice(index, 1)
    },
  },
}
</script>

<style type="text/css"></style>
