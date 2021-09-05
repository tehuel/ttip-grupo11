const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const IngredientRoute = require("./routes/ingredient.route");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
app.use("/ingredient", IngredientRoute);

app.listen(port, () => console.log(`listening on http://localhost:${port}!`));
