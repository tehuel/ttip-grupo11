const validationMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json(error);
  } else {
    req.body = value;
    next();
  }
};

module.exports = {
  validationMiddleware,
};
