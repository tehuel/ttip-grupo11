const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
let User = require("../models/user.model");

exports.authenticate = async function ({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, config.TOKEN_SECRET, {
      expiresIn: config.TOKEN_TIMEOUT,
    });

    // borro la contraseña para no devolverla en la respuesta
    const responseUser = user.toJSON();
    delete responseUser.password;

    return {
      ...responseUser,
      token,
    };
  }
};

exports.create = async function ({ name, image, email, password }) {
  // validate
  if (await User.findOne({ email })) {
    throw "El email [" + email + "] ya existe";
  }
  if (!password) {
    throw "La contraseña es requerida";
  }

  const user = await User.create({
    name,
    image,
    email,
    password: bcrypt.hashSync(password),
  });

  // borro la contraseña para no devolverla en la respuesta
  const responseUser = user.toJSON();
  delete responseUser.password;

  return responseUser;
};

exports.getById = async function (id) {
  return User.findById(id, { password: false });
};

exports.update = async function ({ id, name, image, email }) {
  return User.findByIdAndUpdate(
    id,
    { name, image, email },
    {
      returnDocument: "after",
    }
  );
};

exports.addToFav = async function (id, recipe) {
  const user = await this.getById(id);
  user.favRecipes.push(recipe.id);
  await user.save();
  return user;
};
