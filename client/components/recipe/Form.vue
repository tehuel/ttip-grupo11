<template>
  <div class="recipe-form">
    <b-form
      class="my-5"
      @submit.stop.prevent="onSubmitRecipe"
      @reset.stop.prevent="onResetForm"
    >
      <b-form-group id="group-name" label="Nombre:" label-for="input-name">
        <b-form-input id="input-name" v-model="name" trim type="text" />
      </b-form-group>
      <b-form-group id="group-image" label="Imagen:">
        <b-form-input id="input-image" v-model="image" type="text" />
      </b-form-group>
      <b-form-group
        id="group-description"
        label="Descripción:"
        label-for="input-description"
      >
        <b-form-textarea v-model="description" />
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
              <b-form-text>Ingrediente {{ index + 1 }}</b-form-text>
              <b-form-group
                label="Ingrediente:"
                label-cols-sm="3"
                label-cols-md="2"
              >
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
                label-cols-md="2"
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
      <b-list-group v-if="instructions" class="mb-2">
        <b-list-group-item
          v-for="(_, index) in instructions"
          :key="index"
          class="pr-0"
        >
          <div class="row no-gutters">
            <div class="col">
              <b-form-text>Paso {{ index + 1 }}</b-form-text>
              <b-form-group label="Titulo:" label-cols-sm="3" label-cols-md="2">
                <b-form-input v-model="instructions[index].title" type="text" />
              </b-form-group>
              <b-form-group label="Imagen:" label-cols-sm="3" label-cols-md="2">
                <b-form-input v-model="instructions[index].image" type="text" />
              </b-form-group>
              <b-form-group
                label="Descripción:"
                label-cols-sm="3"
                label-cols-md="2"
              >
                <b-form-textarea
                  v-model="instructions[index].description"
                ></b-form-textarea>
              </b-form-group>
            </div>
            <div class="col-auto mx-2">
              <b-btn
                :disabled="instructions.length <= 1"
                variant="danger"
                size="sm"
                title="Eliminar Ingrediente"
                @click="deleteInstruction(index)"
              >
                x
              </b-btn>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <b-btn @click="addInstruction">Agregar Paso</b-btn>
      <hr />
      <b-button type="submit" variant="primary">
        {{ create ? 'Crear' : 'Editar' }} Receta
      </b-button>
      <b-button type="reset" variant="light">Cancelar</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
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
  computed: {
    tagsList() {
      return this.$store.state.tags.list
    },
    ingredientsList() {
      return this.$store.state.ingredients.list
    },
  },
  created() {
    this.initializeRecipe()
  },
  fetchOnServer: false,
  methods: {
    onSubmitRecipe() {
      const recipe = {
        name: this.name,
        description: this.description,
        image: this.image,
        tags: this.tags,
        ingredients: this.ingredients,
        instructions: this.instructions,
      }
      this.$emit('submit', { recipe })
    },
    onResetForm() {
      this.initializeRecipe()
      this.$emit('reset')
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
    initializeRecipe() {
      const {
        name = '',
        description = '',
        image = '',
        tags = [],
        ingredients = [
          {
            quantity: '',
            ingredient: null,
          },
        ],
        instructions = [
          {
            title: null,
            description: null,
            image: null,
          },
        ],
      } = this.recipe

      const formattedIngredients = ingredients.map(
        ({ quantity, ingredient }) => {
          const ingredientName =
            this.$store.getters['ingredients/getIngredientById'](
              ingredient
            )?.name
          return {
            quantity,
            ingredient: ingredientName,
          }
        }
      )

      this.name = name
      this.description = description
      this.image = image
      this.tags = JSON.parse(JSON.stringify(tags))
      this.ingredients = JSON.parse(JSON.stringify(formattedIngredients))
      this.instructions = JSON.parse(JSON.stringify(instructions))
    },
  },
}
</script>
