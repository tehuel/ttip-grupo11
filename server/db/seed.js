const seeder = require("mongoose-seed");
const config = require("../config");
const fakeIngredient = require("../models/ingredient.fake");

// Connect to MongoDB via Mongoose
seeder.connect(config.MONGO_URL, () => {
  // Load Mongoose models
  seeder.loadModels(["./models/ingredient.model.js"]);

  // Clear specified collections
  seeder.clearModels(["ingredients"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: "ingredients",
    documents: new Array(30).fill().map(() => fakeIngredient()),
  },
];
