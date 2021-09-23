const { Schema, model } = require("mongoose");
const Ingredient = require("../models/ingredient.model")

const RecipeSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  rating: {
    type: Number,
  },
  ingredients: {
    type: [Ingredient.schema],
  },
  imgUrl: {
    type: String,
  }
});

module.exports = model("recipes", RecipeSchema);
