const { Schema, model } = require("mongoose");
const User = require("./user.model");

const FavSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("favs", FavSchema);
