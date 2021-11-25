const validationMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      errors: error.details,
    });
  } else {
    req.body = value;
    next();
  }
};

/**
 * Middleware que devuelve error si no se encuentra el usuario
 */
const userValidationMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({
      message: "User token not found",
    });
  }
  next();
};

module.exports = {
  validationMiddleware,
  userValidationMiddleware,
};
