const mongoose = require("mongoose");
const config = require("../config.js");
const usersSeeder = require("./users.seeder");
const ingredientSeeder = require("./ingredient.seeder");
const tagSeeder = require("./tag.seeder");
const recipeSeeder = require("./recipe.seeder");
const commentSeeder = require("./comment.seeder");

const seed = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
    console.log("MongoDB connected!");
  } catch (e) {
    console.log("Error connecting", e);
  }

  // Users
  const users = await usersSeeder();
  console.log("usersSeeder", users);

  // Ingredients
  const ingredients = await ingredientSeeder();
  console.log("ingredientSeeder", ingredients);

  // Tags
  const tags = await tagSeeder();
  console.log("tagSeeder", tags);

  const recipes = await recipeSeeder(users, ingredients, tags);
  console.log("recipeSeeder", recipes);

  const comments = await commentSeeder(recipes, users);
  console.log("commentSeeder", comments);

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
