let RecipeService = require("../services/recipe.service");

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
    const { name, description, ingredients } = req.body;

    const createdRecipe = await RecipeService.create({
      name,
      description,
      ingredients,
    });
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
    const { name: oldName } = req.params;
    const { name: newName} = req.body;
    const { description: newDescription } = req.body;
    const { ingredients: newIngredients } = req.body;

   
    //const { ingredients: newIngredients } = req.body;

    const updatedRecipe = await RecipeService.update(oldName, {
      name: newName,
      description: newDescription,
      ingredients: newIngredients
    });

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

    RecipeService.delete(name);

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
