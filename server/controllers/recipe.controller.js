let RecipeService = require("../services/recipe.service");
let IngredientService = require("../services/ingredient.service");
let TagService = require("../services/tag.service");

exports.getRecipes = async function (req, res) {
  try {
    const { sort, skip, limit } = req.pagination;
    let recipes = await RecipeService.findAll(sort, skip, limit);
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
    const { sub: user } = req.user;
    // console.log("user:", user);

    // TODO: validate req.body
    const { name, description, instructions, ingredients, image, tags } =
      req.body.recipe;

    // acá creo los ingredientes que no existen
    const completeIngredientsList = await Promise.all(
      ingredients.map(async ({ quantity, ingredient: IngredientName }) => {
        const ingredient = await IngredientService.getOrCreate(IngredientName);
        return {
          quantity: quantity,
          ingredient: ingredient._id,
        };
      })
    );
    console.log("ingredients: ", completeIngredientsList);
    // await IngredientService.create(ingredients);

    const recipeData = {
      name,
      description,
      instructions,
      ingredients: completeIngredientsList,
      image,
      tags,
      user,
      ratings: [],
      avgRating: null,
    };

    console.log("Recipe Data", recipeData);

    const createdRecipe = await RecipeService.create(recipeData);

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

exports.rate = async function (req, res) {
  try {
    // TODO: validate req.params and req.body
    const { id } = req.params;
    const { rating } = req.body;

    const ratedRecipe = await RecipeService.rate(id, rating);

    return res.status(200).json({
      message: "Receta calificada.",
      data: ratedRecipe,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.delete = async function (req, res) {
  try {
    // TODO: validate req.params
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

exports.getById = async function (req, res) {
  try {
    // TODO: validate req.params
    const { id } = req.params;
    let recipe = await RecipeService.getById(id);
    return res.status(200).json({
      data: recipe,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getByName = async function (req, res) {
  try {
    // TODO: validate req.params
    const { name } = req.params;
    let recipe = await RecipeService.getByName(name);
    return res.status(200).json({
      data: recipe,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.search = async function (req, res) {
  try {
    const { name, ingredients = [], tags = [] } = req.body;
    let recipes = await RecipeService.search(name, ingredients, tags);
    return res.status(200).json({
      data: recipes,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
