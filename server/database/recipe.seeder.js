const Recipe = require("../models/recipe.model");
const RecipeFake = require("../models/recipe.fake");

const seedRecipes = async () => {
  // genero un listado de recetas
  const fakeRecipes = Array(20)
    .fill()
    .map(() => RecipeFake());

  // agrego las recetas a la BD
  await Recipe.collection.deleteMany({});
  const result = await Recipe.insertMany(fakeRecipes);
  console.log("seedRecipes complete", result);
};

module.exports = seedRecipes;
