const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ingredients", ingredientSchema);
