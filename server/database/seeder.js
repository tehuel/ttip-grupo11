const mongoose = require("mongoose");
const config = require("../config.js");
const ingredientSeeder = require("./ingredient.seeder");
const tagSeeder = require("./tag.seeder");
const recipeSeeder = require("./recipe.seeder");

const seed = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
    console.log("MongoDB connected!");
  } catch (e) {
    console.log("Error connecting", e);
  }

  // Ingredients
  const ingredients = await ingredientSeeder();
  console.log("ingredientSeeder", ingredients);

  // Tags
  const tags = await tagSeeder();
  console.log("tagSeeder", tags);

  const recipes = await recipeSeeder(ingredients, tags);
  console.log("recipeSeeder", recipes);

  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  } catch (e) {
    console.log("Error disconnecting", e);
  }
};

seed()
  .then(() => {
    console.log("Seed OK");
  })
  .catch((e) => {
    console.error("Error", e);
  });
