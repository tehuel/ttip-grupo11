let RecipeService = require("../services/recipe.service");
let IngredientService = require("../services/ingredient.service");
let TagService = require("../services/tag.service");

exports.getRecipes = async function (req, res) {
  try {
    let recipes = await RecipeService.findAll();
    return res.status(200).json({
      data: recipes,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.add = async function (req, res) {
  try {
    // TODO: validate req.body
    const { name, description, ingredients, tags } = req.body;

    const createdRecipe = await RecipeService.create({
      name,
      description,
      ingredients,
      tags,
    });

    await IngredientService.create(ingredients);
    await TagService.create(tags);

    return res.status(201).json({
      message: "Created",
      data: createdRecipe,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.update = async function (req, res) {
  try {
    // TODO: validate req.params and req.body
    const { name: originalName } = req.params;
    const { name, description, ingredients, tags } = req.body;
    //const { ingredients: newIngredients } = req.body;

    const updatedRecipe = await RecipeService.update(originalName, {
      name: name,
      description: description,
      ingredients: ingredients,
      tags: tags,
    });

    await IngredientService.create(ingredients);
    await TagService.create(tags);

    return res.status(200).json({
      message: "Receta modificada.",
      data: updatedRecipe,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.delete = async function (req, res) {
  try {
    // TODO: validate req.params and req.body
    const { name } = req.params;

    await RecipeService.delete(name);

    return res.status(200).json({
      message: "Receta eliminada.",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getByName = async function (req, res, next) {
  RecipeService.getByName(req.params.name, req.body)
    .then((recipes) => res.json(recipes))
    .catch((err) => next(err));
};

exports.searchByIngredients = async function (req, res, next) {
  // TODO: validate req.body
  RecipeService.searchByIngredients(req.body.ingredients)
    .then((recipes) => res.json(recipes))
    .catch((err) => next(err));
};

exports.searchByTags = async function (req, res, next) {
  // TODO: validate req.body
  RecipeService.searchByTags(req.body.tags)
    .then((recipes) => res.json(recipes))
    .catch((err) => next(err));
};
