const Joi = require("joi");
const { validationMiddleware } = require("./middleware");

const createSchema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  create: validationMiddleware(createSchema),
};
