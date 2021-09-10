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
