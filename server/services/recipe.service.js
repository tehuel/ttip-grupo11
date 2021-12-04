let Recipe = require("../models/recipe.model");

const transformSort = (sort) => {
  const result = {};
  Object.entries(sort).forEach((entry) => {
    const [key, value] = entry;
    result[key] = value ? 1 : -1;
  });
  return result;
};

exports.findAll = async function (sort, skip, limit) {
  try {
    const transformedSort = transformSort(sort);
    return await Recipe.find().sort(transformedSort).skip(skip).limit(limit);
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

exports.update = async function (id, update) {
  const recipe = await Recipe.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
};

const calculateAverage = (list) => {
  const result = list.reduce((a, b) => a + b, 0) / list.length;
  return result;
};

exports.rate = async function (id, rating) {
  const recipe = await Recipe.findById(id);
  recipe.ratings.push(rating);
  recipe.avgRating = calculateAverage(recipe.ratings);
  recipe.save();
  return recipe;
};

exports.delete = async function (name) {
  return Recipe.deleteOne({ name: name });
};

exports.getById = async function (id) {
  return Recipe.findById(id);
};

exports.getByName = async function (name) {
  return Recipe.find({ name: { $regex: name } });
};

exports.getMany = async function (ids) {
  return Recipe.find().where("_id").in(ids);
};

exports.getCreatedBy = async function (userId) {
  return Recipe.find({ user: userId }, { _id: true });
};

exports.search = async function (name, ingredients, tags, ids) {
  // agrego condicionalmente las queries de búsqueda
  let query = {};
  if (name) {
    // busca cualquier receta por el nombre
    query.name = { $regex: name, $options: "i" };
  }
  if (ingredients.length) {
    // busca cualquier receta que tenga al menos uno de los ingredientes
    query["ingredients.ingredient"] = { $in: ingredients };
  }
  if (tags.length) {
    // busca cualquier receta que tenga TODOS los tags al mismo tiempo
    query.tags = { $all: tags };
  }
  if (ids.length) {
    // busca las recetas en el listado de IDs
    query._id = { $in: ids };
  }

  return Recipe.find(query);
};
