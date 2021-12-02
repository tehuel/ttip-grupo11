const express = require("express");
const cors = require("cors");
const jwt = require("../utils/jwt");

const IngredientRoute = require("../routes/ingredient.route");
const RecipeRoute = require("../routes/recipe.route");
const TagRoute = require("../routes/tag.route");
const UserRoute = require("../routes/user.route");
const CommentRoute = require("../routes/comment.route");
const FavRoute = require("../routes/fav.route");
const FollowRoute = require("../routes/follow.route");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(jwt());
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
app.use("/ingredients", IngredientRoute);
app.use("/recipes", RecipeRoute);
app.use("/tags", TagRoute);
app.use("/users", UserRoute);
app.use("/comments", CommentRoute);
app.use("/favourites", FavRoute);
app.use("/follows", FollowRoute);

module.exports = app;
