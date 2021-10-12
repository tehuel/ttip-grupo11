let Recipe = require("../models/recipe.model");

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

exports.searchByIngredients = async function (ingredients) {
  // busca cualquier receta que tenga al menos uno de los ingredientes
  console.log(ingredients)
  return Recipe.find({
    ingredients: { $in: ingredients },
  });
};

exports.searchByTags = async function (tags) {
  // busca cualquier receta que tenga al menos uno de los ingredientes
  return Recipe.find({
    tags: { $in: tags },
  });
};
