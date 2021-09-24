const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    ingredients: {
      type: Array,
      default: [],
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("recipes", RecipeSchema);
