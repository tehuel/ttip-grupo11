const mongoose = require("mongoose");
const config = require("../config.js");
const ingredientSeeder = require("./ingredient.seeder");

const seed = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
    console.log("MongoDB connected!");
  } catch (e) {
    console.log("Error connecting", e);
  }

  // Ingredients
  await ingredientSeeder();

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
