let Ingredient = require("../models/ingredient.model");

exports.findAll = async function (query, page, limit) {
  try {
    return await Ingredient.find(query)
      .limit(limit)
      .skip(page * limit);
  } catch (e) {
    console.error(e);
    throw Error("Error while Paginating Ingredients");
  }
};
