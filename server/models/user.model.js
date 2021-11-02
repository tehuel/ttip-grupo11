const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "El email es obligatorio"],
  },
  hash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = model("User", userSchema);
