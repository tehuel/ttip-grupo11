let IngredientService = require("../services/ingredient.service");

exports.getIngredients = async function (req, res) {
  // TODO: Validate request parameters, queries using express-validator
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 10;
  try {
    let ingredients = await IngredientService.findAll({}, page, limit);
    return res.status(200).json({
      data: ingredients,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.add = async function (req, res, next){
  try {
    await IngredientService.create(req.body);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}

exports.update = async function(req, res, next) {
  IngredientService
    .update(req.params.name, req.body)
    .then(() => res.json({ message: 'Ingrediente modificado' }))
    .catch((err) => next(err))
}

exports.getByName = async function(req, res, next) {
  IngredientService
    .getByName(req.params.name, req.body)
    .then((ingredients) => res.json(ingredients))
    .catch((err) => next(err))
}