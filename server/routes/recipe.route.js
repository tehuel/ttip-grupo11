const express = require("express");
const router = express.Router();

const RecipeController = require("../controllers/recipe.controller");
const RecipeValidator = require("../validators/recipe.validator");

// /Recipes endpoints
router.get("/", RecipeController.getRecipes);
router.post("/", RecipeController.add);
router.put("/:name", RecipeController.update);
router.delete("/:name", RecipeController.delete);
router.get("/:id", RecipeController.getById);

router.post("/search", RecipeValidator.search, RecipeController.search);

module.exports = router;
