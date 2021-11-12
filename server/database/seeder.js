const mongoose = require("mongoose");
const config = require("../config.js");
const usersSeeder = require("./users.seeder");
const ingredientSeeder = require("./ingredient.seeder");
const tagSeeder = require("./tag.seeder");
const recipeSeeder = require("./recipe.seeder");
const commentSeeder = require("./comment.seeder");

const CONFIGS = {
  USERS: 10,
  INGREDIENTS: 10,
  TAGS: 5,
  RECIPES: 10,
  COMMENTS: 50,
};

const seed = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
    console.log("MongoDB connected!");
  } catch (e) {
    console.log("Error connecting", e);
  }

  // Users
  const users = await usersSeeder(CONFIGS.USERS);
  console.log("usersSeeder", users);

  // Ingredients
  const ingredients = await ingredientSeeder(CONFIGS.INGREDIENTS);
  console.log("ingredientSeeder", ingredients);

  // Tags
  const tags = await tagSeeder(CONFIGS.TAGS);
  console.log("tagSeeder", tags);

  const recipes = await recipeSeeder(users, ingredients, tags, CONFIGS.RECIPES);
  console.log("recipeSeeder", recipes);

  const comments = await commentSeeder(recipes, users, CONFIGS.COMMENTS);
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
