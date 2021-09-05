let Ingredient = require('../models/ingredient.model')

exports.getIngredients = async function (query, page, limit) {
    try {
        return await Ingredient.find(query);
    } catch (e) {
        throw Error('Error while Paginating Ingredients')
    }
}