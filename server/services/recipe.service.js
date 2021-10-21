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

exports.getById = async function (id) {
  return Recipe.findById(id);
};

exports.search = async function (ingredients, tags) {
  // busca cualquier receta que tenga al menos uno de los ingredientes
  console.log("recipe.service.search", {
    ingredients,
    tags,
  });

  // agrego condicionalmente las queries de búsqueda
  let query = {};
  if (ingredients.length) {
    query.ingredients = { $in: ingredients };
  }
  if (tags.length) {
    query.tags = { $all: tags };
  }

  return Recipe.find(query);
};
