const Comment = require("../models/comment.model");

exports.findAll = async function (skip, limit, recipe) {
  try {
    // agrego condicionalmente las queries
    let query = {};
    if (recipe) {
      // busca comentarios para una receta específica
      query.recipe = recipe;
    }
    return await Comment.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user", ["email", "image", "name"]);
  } catch (e) {
    console.error(e);
    throw Error("Error getting comments.");
  }
};

exports.create = async function (commentData) {
  await Comment.ensureIndexes();
  return await Comment.create(commentData);
};
