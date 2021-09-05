const mongoose = require("../db");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("ingredients", ingredientSchema);
