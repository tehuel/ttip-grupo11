const Joi = require("joi");
const { validationMiddleware } = require("./middleware");

const searchSchema = Joi.object()
  .keys({
    ingredients: Joi.array().min(1).items(Joi.string().length(24)).default([]),
    tags: Joi.array().min(1).items(Joi.string().length(24)).default([]),
  })
  .or("ingredients", "tags")
  .required();

exports.search = validationMiddleware(searchSchema);
