const Recipe = require("../models/recipe.model");
const RecipeFake = require("../models/recipe.fake");
const faker = require("faker/locale/es");

const seedRecipes = async (ingredients) => {
  // genero un listado de recetas
  const fakeRecipes = Array(20)
    .fill()
    .map(() => {
      // genero un listado de ingredientes para una receta
      const selectedIngredients = faker.random.arrayElements(ingredients, 3);
      return RecipeFake(selectedIngredients);
    });

  // agrego las recetas a la BD
  await Recipe.collection.deleteMany({});
  return await Recipe.insertMany(fakeRecipes);
};

module.exports = seedRecipes;
