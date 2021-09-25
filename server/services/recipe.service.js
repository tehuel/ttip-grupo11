const ingredientModel = require("../models/ingredient.model");
let Recipe = require("../models/recipe.model");
const { findAll, findByName } = require("./ingredient.service");

exports.findAll = async function () {
  try {
    return await Recipe.find();
  } catch (e) {
    console.error(e);
    throw Error("Error getting recipes.");
  }
};

exports.create = async function (recipeData) {
  const recipe = new Recipe(recipeData);
  await recipe.save();
  return recipe;
};

exports.update = async function (name, update) {
  return Recipe.findOneAndUpdate({ name: name }, update, {
    new: true,
  });
};

exports.delete = async function (name) {
  return Recipe.deleteOne({ name: name });
};

exports.getByName = async function (name) {
  return Recipe.find({
    name: name,
  });
};

exports.getByIngredient = async function (ingredient) {
  const res = await Recipe.find({
    "ingredients.name": ingredient,
  });
  return res;
};
