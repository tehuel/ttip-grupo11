let userService = require("../services/user.service");

exports.authenticate = async function (req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email o contraseña inválido" })
    )
    .catch((err) => next(err));
};

exports.register = async function (req, res, next) {
  userService
    .create(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email o contraseña inválido" })
    )
    .catch((err) => next(err));
};

exports.getCurrent = async function (req, res) {
  const { sub: userId } = req.user;
  try {
    let user = await userService.getById(userId);
    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
