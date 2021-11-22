let Ingredient = require("../models/ingredient.model");

exports.findAll = async function () {
  try {
    return await Ingredient.find();
  } catch (e) {
    console.error(e);
    throw Error("Error getting ingredients.");
  }
};

exports.create = async function ({ name }) {
  await Ingredient.ensureIndexes();
  return await Ingredient.create({ name });
};

exports.update = async function (name, update) {
  await Ingredient.ensureIndexes();
  return Ingredient.findOneAndUpdate({ name: name }, update, {
    new: true,
  });
};

exports.delete = async function (name) {
  return Ingredient.deleteOne({ name: name });
};

exports.getByName = async function (name) {
  return Ingredient.find({
    name: name,
  });
};
