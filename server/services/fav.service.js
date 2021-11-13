const Fav = require("../models/fav.model");

exports.findAll = async function (skip, limit, recipe) {
  try {
    // agrego condicionalmente las queries
    let query = {};
    if (recipe) {
      // busca favs para una receta específica
      query.recipe = recipe;
    }
    return await Fav.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user", ["email", "image", "name"]);
  } catch (e) {
    console.error(e);
    throw Error("Error getting favs.");
  }
};

exports.create = async function (favData) {
  await Fav.ensureIndexes();
  return await Fav.create(favData);
};
