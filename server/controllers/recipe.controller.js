let RecipeService = require("../services/recipe.service");
let IngredientService = require("../services/ingredient.service");
let TagService = require("../services/tag.service");

/**
 * Creo los ingredients que no existen, identifico los existentes
 */
const syncIngredientsList = async (ingredientsList) => {
  return await Promise.all(
    ingredientsList.map(async ({ quantity, ingredient: IngredientName }) => {
      const ingredient = await IngredientService.getOrCreate(IngredientName);
      return {
        quantity: quantity,
        ingredient: ingredient._id,
      };
    })
  );
};

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

    // TODO: validate req.body
    const {
      name,
      description,
      instructions,
      ingredients = [],
      image,
      tags,
    } = req.body.recipe;

    // acá creo los ingredientes que no existen
    const completeIngredientsList = await syncIngredientsList(ingredients);
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
    const { sub: user } = req.user;
    const { id: recipeId } = req.params;
    const recipe = await RecipeService.getById(recipeId);

    console.log("update", {
      user,
      recipeId,
      "recipe.user": recipe.user,
    });

    if (recipe.user != user) {
      return res.status(400).json({
        message: "permission error",
      });
    }

    // TODO: validate req.body
    const {
      name,
      description,
      instructions,
      ingredients = [],
      image,
      tags,
    } = req.body.recipe;

    // acá creo los ingredientes que no existen
    const completeIngredientsList = await syncIngredientsList(ingredients);

    const updatedRecipe = await RecipeService.update(recipeId, {
      name,
      description,
      instructions,
      ingredients: completeIngredientsList,
      image,
      tags,
    });

    return res.status(201).json({
      message: "Updated",
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
    const { id } = req.params;
    await RecipeService.delete(id);

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
    const { name, ingredients = [], tags = [], ids = [] } = req.body;
    let recipes = await RecipeService.search(name, ingredients, tags, ids);
    return res.status(200).json({
      data: recipes,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
