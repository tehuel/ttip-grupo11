let IngredientService = require("../services/ingredient.service");

exports.getIngredients = async function (req, res) {
  try {
    let ingredients = await IngredientService.findAll();
    return res.status(200).json({
      data: ingredients,
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
    const { name } = req.body;

    const createdIngredient = await IngredientService.create({ name });
    return res.status(201).json({
      message: "Created",
      data: createdIngredient,
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
    const { name: newName } = req.body;

    const updatedIngredient = await IngredientService.update(oldName, {
      name: newName,
    });

    return res.status(200).json({
      message: "Ingrediente modificado",
      data: updatedIngredient,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getByName = async function (req, res, next) {
  IngredientService.getByName(req.params.name, req.body)
    .then((ingredients) => res.json(ingredients))
    .catch((err) => next(err));
};
