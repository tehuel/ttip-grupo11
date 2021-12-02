<template>
  <div class="recipe-form">
    <div class="container my-5">
      <h1>Editar Receta</h1>
      <b-form class="my-5" @submit="onSubmitEditRecipe" @reset="onResetForm">
        <b-form-group id="group-name" label="Nombre:" label-for="input-name">
          <b-form-input id="input-name" v-model="name" trim type="text" />
        </b-form-group>
        <b-form-group
          id="group-description"
          label="Descripción:"
          label-for="input-description"
        >
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
        <b-list-group class="mb-2">
          <b-list-group-item
            v-for="(_, index) in ingredients"
            :key="index"
            class="pr-0"
          >
            <div class="row no-gutters">
              <div class="col">
                <b-form-group label="Ingrediente:" label-cols-sm="3">
                  <b-form-input
                    v-model="ingredients[index].ingredient"
                    type="text"
                    list="ingredients-list"
                  />
                  <datalist id="ingredients-list">
                    <option
                      v-for="ingredientOption in ingredientsList"
                      :key="ingredientOption.id"
                    >
                      {{ ingredientOption.name }}
                    </option>
                  </datalist>
                </b-form-group>
                <b-form-group
                  label="Cantidad:"
                  label-cols-sm="3"
                  description="Ej: 3 unidades, 4 gotas, 200 gramos, etc..."
                >
                  <b-form-input
                    v-model="ingredients[index].quantity"
                    type="text"
                  />
                </b-form-group>
              </div>
              <div class="col-auto mx-2">
                <b-btn
                  :disabled="ingredients.length <= 1"
                  variant="danger"
                  size="sm"
                  @click="deleteIngredient(index)"
                >
                  x
                </b-btn>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
        <b-btn @click="addIngredient">Agregar Ingrediente</b-btn>

        <hr />
        <h2>Instrucciones</h2>
        <ul v-if="instructions">
          <li v-for="(_, index) in instructions" :key="index">
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
        <b-button type="submit" variant="primary">Editar Receta</b-button>
        <b-button type="reset" variant="light">Cancelar</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  props: ['recipe'],
  data() {
    return {
      isLoading: false,
      newName: null,
      newDescription: null,
      newImage: null,
      newTags: null,
      newIngredients: null,
      newInstructions: null,
    }
  },
  async fetch() {
    await this.$store.dispatch('ingredients/getIngredients')
    await this.$store.dispatch('tags/getTags')
  },
  fetchOnServer: false,
  computed: {
    name: {
      get() {
        return this.newName || this.recipe.name
      },
      set(value) {
        this.newName = value
      },
    },
    description: {
      get() {
        return this.newDescription || this.recipe.description
      },
      set(value) {
        this.newDescription = value
      },
    },
    image: {
      get() {
        return this.newImage || this.recipe.image
      },
      set(value) {
        this.newImage = value
      },
    },
    ingredients: {
      get() {
        return this.newIngredients || this.recipe.ingredients
      },
      set(value) {
        this.newIngredients = value
      },
    },
    instructions: {
      get() {
        return this.newInstructions || this.recipe.instructions
      },
      set(value) {
        this.newInstructions = value
      },
    },
    tags: {
      get() {
        return this.newTags || this.recipe.tags
      },
      set(value) {
        this.newTags = value
      },
    },
    tagsList() {
      return this.$store.state.tags.list
    },
    ingredientsList() {
      return this.$store.state.ingredients.list
    },
  },
  methods: {
    async onSubmitEditRecipe() {
      this.isLoading = true
      try {
        const userToken = this.$store.state.user.token
        const updatedRecipe = {
          name: this.name,
          description: this.description,
          image: this.image,
          tags: this.tags,
          ingredients: this.ingredients,
          instructions: this.instructions,
        }
        await this.$store.dispatch('recipes/update', {
          updatedRecipe,
          userToken,
        })
        this.$bvToast.toast('Receta Actualizada correctamente', {
          title: 'Receta Creada',
          variant: 'success',
          appendToast: true,
          solid: true,
        })
      } catch (e) {
        this.$bvToast.toast('Error Cargando la Receta', {
          title: 'Error',
          variant: 'danger',
          appendToast: true,
          solid: true,
        })
      }
      this.isLoading = false
      this.$emit('submit')
    },
    onResetForm() {
      this.$emit('reset')
      return null
    },
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
