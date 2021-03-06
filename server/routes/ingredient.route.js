const express = require("express");
const router = express.Router();

const IngredientController = require("../controllers/ingredient.controller");
const IngredientValidator = require("../validators/ingredient.validator");

// "/ingredients" endpoints
router.get("/", IngredientController.getIngredients);
router.post("/", IngredientValidator.create, IngredientController.add);
router.put("/:name", IngredientController.update);
router.delete("/:name", IngredientController.delete);
router.get("/:name", IngredientController.getByName);

module.exports = router;
