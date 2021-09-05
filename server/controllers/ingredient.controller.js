let IngredientService = require('../services/ingredient.service')

exports.getIngredients = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    let page = req.params.page ? req.params.page : 1;
    let limit = req.params.limit ? req.params.limit : 10;
    try {
        let ingredients = await IngredientService.getIngredients({}, page, limit)
        return res.status(200).json({
            data: ingredients,
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}