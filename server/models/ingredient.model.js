const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: { type: String, unique: true },
});

module.exports = model("ingredients", ingredientSchema);
