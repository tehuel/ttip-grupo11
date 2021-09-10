let Ingredient = require("../models/ingredient.model");

exports.findAll = async function () {
  try {
    return await Ingredient.find();
  } catch (e) {
    console.error(e);
    throw Error("Error getting ingredients.");
  }
};

exports.create = async function (query) {
  const ingredient = new Ingredient(query.name);
  await ingredient.save();
  return ingredient;
};

exports.update = async function (name, ingredientParam) {
  const ingredient = await Ingredient.find({ name });

  // validate
  if (!ingredient) throw "ingrediente no encontrado";

  // copy ingredientParam properties to user
  Object.assign(ingredient, ingredientParam);

  await ingredient.save();
};

exports.getByName = async function (name) {
  return Ingredient.find({
    name: name,
  });
};
