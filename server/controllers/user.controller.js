const UserService = require("../services/user.service");

exports.authenticate = async function (req, res) {
  try {
    // TODO: validate req.body
    const { email, password } = req.body;

    const authenticatedUser = await UserService.authenticate({
      email,
      password,
    });

    return res.status(200).json({
      message: "Authenticated",
      data: authenticatedUser,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.register = async function (req, res) {
  try {
    // TODO: validate req.body
    const { name, image, email, password } = req.body;

    const createdUser = await UserService.create({
      name,
      image,
      email,
      password,
    });

    return res.status(201).json({
      message: "Created",
      data: createdUser,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getCurrent = async function (req, res) {
  try {
    const { sub: userId } = req.user;
    let user = await UserService.getById(userId);
    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.addToFav = async function (req, res) {
  try {
    const { user, recipe } = req.body;
    let updatedUser = await UserService.getById(user);
    await UserService.addToFav(user, recipe);
    return res.status(200).json({
      data: updatedUser,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};