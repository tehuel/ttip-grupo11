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

exports.create = async function(query) {
  const ingredient = new Ingredient(query.name)
  await ingredient.save()
  return ingredient
}

exports.update = async function(name, ingredientParam) {
  const ingredient = await ingredient.findByName(name)

  // validate
  if (!ingredient) throw 'ingrediente no encontrado'
  
  // copy ingredientParam properties to user
  Object.assign(ingredient, ingredientParam)

  await ingredient.save()
}

exports.getByName = async function(name) {
  return await Ingredient.find({
    name: name
  })
}