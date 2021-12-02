const { Schema, model } = require("mongoose");
const User = require("./user.model");

const FollowageSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("follows", FollowageSchema);
