const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const IngredientRoute = require("../routes/ingredient.route");
const RecipeRoute = require ("../routes/recipe.route");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
app.use("/ingredients", IngredientRoute);
app.use("/recipes", RecipeRoute);
module.exports = app;
