const express = require("express");
const router = express.Router();

const IngredientController = require("../controllers/ingredient.controller");

router.get("/", IngredientController.getIngredients);

module.exports = router;
