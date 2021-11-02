const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");

exports.authenticate = async function ({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
   // const token = jwt.sign({ sub: user.id }, process.env.TOKEN, {
   //   expiresIn: process.env.TOKEN_TIMEOUT,
   // });
    return {
      ...userWithoutHash,
      //token,
    };
  }
};

exports.getAll = async function () {
  return await User.find().select("-hash");
};

exports.getById = async function (id) {
  return await User.findById(id).select("-hash");
};

exports.existsUserWithEmail = async function (email) {
  return await User.findOne({ email });
};

exports.create = async function (userParam) {
  // validate
  if (await User.existsUserWithEmail(userParam.email)) {
    throw "El email [" + userParam.email + "] ya existe";
  }
  if (!userParam.password) {
    throw "La contraseña es requerida";
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  await user.save();

  return user;
};

exports.update = async function (id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "Usuario no encontrado";
  if (
    user.email !== userParam.email &&
    (await this.existsUserWithEmail(userParam.email))
  ) {
    throw "El email [" + userParam.email + "] ya existe";
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
};

exports.delete = async function (id) {
  await User.findOneAndDelete(id);
};
