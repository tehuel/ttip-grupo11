var express = require('express');
var router = express.Router();

var IngredientController = require('../controllers/ingredient.controller')

router.get('/', IngredientController.getIngredients)

module.exports = router;