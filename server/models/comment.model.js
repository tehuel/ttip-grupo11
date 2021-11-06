const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("comments", CommentSchema);
