const { Schema, model } = require("mongoose");
const User = require("./user.model");
const Ingredient = require("./ingredient.model");
const Tag = require("./tag.model");

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    description: {
      type: String,
    },
    instructions: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],
    ratings: [
      {
        type: Number,
      },
    ],
    avgRating: {
      type: Number,
    },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: Ingredient,
        },
        quantity: String,
      },
    ],
    image: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Tag,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("recipes", RecipeSchema);
