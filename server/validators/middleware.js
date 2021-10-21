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

module.exports = {
  validationMiddleware,
};
