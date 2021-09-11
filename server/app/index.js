const express = require("express");
const cors = require("cors");

const IngredientRoute = require("../routes/ingredient.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
app.use("/ingredients", IngredientRoute);

module.exports = app;
