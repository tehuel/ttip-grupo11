const Ingredient = require("../models/ingredient.model");
const IngredientFake = require("../models/ingredient.fake");

const seedIngredients = async () => {
  // genero un listado de ingredientes
  const fakeIngredients = Array(10)
    .fill()
    .map(() => IngredientFake());

  // agrego los ingredientes a la BD
  await Ingredient.collection.deleteMany({});
  const result = await Ingredient.insertMany(fakeIngredients);
  console.log("seedIngredients complete", result);
};

module.exports = seedIngredients;
