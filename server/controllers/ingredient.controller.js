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
    // validate req.body before using it
    const { name } = req.body;

    const result = await IngredientService.create({
      name: name,
    });
    return res.status(201).json({
      message: "Created",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.update = async function (req, res, next) {
  IngredientService.update(req.params.name, req.body)
    .then(() => res.json({ message: "Ingrediente modificado" }))
    .catch((err) => next(err));
};

exports.getByName = async function (req, res, next) {
  IngredientService.getByName(req.params.name, req.body)
    .then((ingredients) => res.json(ingredients))
    .catch((err) => next(err));
};
