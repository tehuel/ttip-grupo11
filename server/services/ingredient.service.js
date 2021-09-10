let Ingredient = require("../models/ingredient.model");

exports.findAll = async function () {
  try {
    return await Ingredient.find();
  } catch (e) {
    console.error(e);
    throw Error("Error getting ingredients.");
  }
};

exports.create = async function (ingredientData) {
  const ingredient = new Ingredient(ingredientData);
  await ingredient.save();
  return ingredient;
};

exports.update = async function (name, update) {
  return Ingredient.findOneAndUpdate({ name: name }, update, {
    new: true,
  });
};

exports.getByName = async function (name) {
  return Ingredient.find({
    name: name,
  });
};
