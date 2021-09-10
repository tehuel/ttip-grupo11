let Ingredient = require("../models/ingredient.model");

exports.findAll = async function () {
  try {
    return await Ingredient.find();
  } catch (e) {
    console.error(e);
    throw Error("Error getting ingredients.");
  }
};
