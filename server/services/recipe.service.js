let Recipe = require("../models/recipe.model");

exports.findAll = async function (skip, limit) {
  try {
    return await Recipe.find().skip(skip).limit(limit);
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

exports.getById = async function (id) {
  return Recipe.findById(id);
};

exports.search = async function (ingredients, tags) {
  // agrego condicionalmente las queries de búsqueda
  let query = {};
  if (ingredients.length) {
    // busca cualquier receta que tenga al menos uno de los ingredientes
    query.ingredients = { $in: ingredients };
  }
  if (tags.length) {
    // busca cualquier receta que tenga TODOS los tags al mismo tiempo
    query.tags = { $all: tags };
  }

  return Recipe.find(query);
};
