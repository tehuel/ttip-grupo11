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

// exports.getAll = async function (req, res, next) {
//   userService
//     .getAll()
//     .then((users) => res.json(users))
//     .catch((err) => next(err));
// };
//
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

// exports.getById = async function (req, res, next) {
//   userService
//     .getById(req.params.id)
//     .then((user) => (user ? res.json(user) : res.sendStatus(404)))
//     .catch((err) => next(err));
// };
//
// exports.checkAvailability = async function (req, res, next) {
//   userService
//     .existsUserWithEmail(req.params.email)
//     .then((user) => (!user ? res.json(true) : res.sendStatus(404)))
//     .catch((err) => next(err));
// };
//
// exports.update = async function (req, res, next) {
//   userService
//     .update(req.params.id, req.body)
//     .then(() => res.json({ message: "Usuario modificado correctamente" }))
//     .catch((err) => next(err));
// };
//
// exports.delete = async function (req, res, next) {
//   userService
//     .delete(req.params.id)
//     .then(() => res.json({ message: "Usuario eliminado correctamente" }))
//     .catch((err) => next(err));
// };
