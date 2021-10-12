const express = require("express");
const router = express.Router();

const RecipeController = require("../controllers/recipe.controller");

// /Recipes endpoints
router.get("/", RecipeController.getRecipes);
router.post("/", RecipeController.add);
router.put("/:name", RecipeController.update);
router.delete("/:name", RecipeController.delete);
router.get("/:name", RecipeController.getByName);

router.post("/search", RecipeController.searchByIngredients);
router.post("/search", RecipeController.searchByTags);
module.exports = router;
