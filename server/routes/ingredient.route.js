const express = require("express");
const router = express.Router();

const IngredientController = require("../controllers/ingredient.controller");

router.get("/", IngredientController.getIngredients);
router.post("/add", IngredientController.add);
router.put("/update/:name", IngredientController.update);
router.get("/ingredients/:name", IngredientController.getByName)

module.exports = router;