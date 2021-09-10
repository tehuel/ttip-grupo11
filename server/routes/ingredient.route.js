const express = require("express");
const router = express.Router();

const IngredientController = require("../controllers/ingredient.controller");

// /ingredients endpoints
router.get("/", IngredientController.getIngredients);
router.post("/", IngredientController.add);
router.put("/:name", IngredientController.update);
router.get("/:name", IngredientController.getByName);

module.exports = router;
