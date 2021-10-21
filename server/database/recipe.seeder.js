const Recipe = require("../models/recipe.model");
const RecipeFake = require("../models/recipe.fake");
const faker = require("faker/locale/es");

const seedRecipes = async (ingredients = [], tags = [], amount = 20) => {
  // genero un listado de recetas
  const fakeRecipes = Array(amount)
    .fill()
    .map(() => {
      // genero un listado de ingredientes para una receta
      const selectedIngredients = faker.random.arrayElements(
        ingredients,
        faker.datatype.number({ min: 2, max: 5 })
      );

      // genero un listado de tags para una receta
      const selectedTags = faker.random.arrayElements(
        tags,
        faker.datatype.number({ min: 0, max: 2 })
      );

      // genero una receta
      return RecipeFake(selectedIngredients, selectedTags);
    });

  // agrego las recetas a la BD
  await Recipe.collection.deleteMany({});
  return await Recipe.insertMany(fakeRecipes);
};

module.exports = seedRecipes;
