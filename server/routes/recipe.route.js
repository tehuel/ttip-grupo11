const express = require("express");
const router = express.Router();
const paginationMiddleware = require("express-pagination-middleware");

const RecipeController = require("../controllers/recipe.controller");
const RecipeValidator = require("../validators/recipe.validator");
const {
  userValidationMiddleware: UserValidator,
} = require("../validators/middleware");
const RecipePagination = paginationMiddleware({
  sort: {
    validKeys: ["createdAt", "name"],
    default: "-createdAt",
  },
});

// "/recipes" endpoints
router.get("/", RecipePagination, RecipeController.getRecipes);
router.post("/", UserValidator, RecipeValidator.create, RecipeController.add);
router.put("/:name", RecipeController.update);
router.delete("/:name", RecipeController.delete);
router.get("/:id", RecipeController.getById);
router.get("/get/:name", RecipeController.getByName);
router.post("/:id/rate", RecipeController.rate);

router.post("/search", RecipeValidator.search, RecipeController.search);

module.exports = router;
