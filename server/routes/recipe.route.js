const express = require("express");
const router = express.Router();
const paginationMiddleware = require("express-pagination-middleware");

const RecipeController = require("../controllers/recipe.controller");
const RecipeValidator = require("../validators/recipe.validator");
const RecipePagination = paginationMiddleware({
  sort: {
    validKeys: ["created", "name"],
    default: "name",
  },
});

// /Recipes endpoints
router.get("/", RecipePagination, RecipeController.getRecipes);
router.post("/", RecipeController.add);
router.put("/:name", RecipeController.update);
router.put("/rate/:name", RecipeController.rate);
router.delete("/:name", RecipeController.delete);
router.get("/:id", RecipeController.getById);

router.post("/search", RecipeValidator.search, RecipeController.search);

module.exports = router;
