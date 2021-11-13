const Recipe = require("../models/recipe.model");
const RecipeFake = require("../models/recipe.fake");
const faker = require("faker/locale/es");

const units = [
  "kilo(s)",
  "litro(s)",
  "gramo(s)",
  "taza(s)",
  "unidad(es)",
  "cucharada(s)",
  "cucharadita(s)",
  "pizca(s)",
];

const seedRecipes = async (
  users = [],
  ingredients = [],
  tags = [],
  amount = 20
) => {
  // genero un listado de recetas
  const fakeRecipes = Array(amount)
    .fill()
    .map(() => {
      // selecciono un usuario
      const selectedUser = faker.random.arrayElement(users);

      // genero un listado de ingredientes para una receta
      const selectedIngredients = faker.random
        .arrayElements(ingredients, faker.datatype.number({ min: 1, max: 4 }))
        .map((ingredient) => {
          const selectedUnit = faker.random.arrayElement(units);
          const selectedAmount = faker.datatype.number({ min: 1, max: 10 });
          return {
            quantity: `${selectedAmount} ${selectedUnit}`,
            ingredient: ingredient,
          };
        });

      // genero un listado de tags para una receta
      const selectedTags = faker.random.arrayElements(
        tags,
        faker.datatype.number({ min: 0, max: 2 })
      );

      // genero una receta
      return RecipeFake(selectedUser, selectedIngredients, selectedTags);
    });

  // agrego las recetas a la BD
  await Recipe.collection.deleteMany({});
  return await Recipe.insertMany(fakeRecipes);
};

module.exports = seedRecipes;
