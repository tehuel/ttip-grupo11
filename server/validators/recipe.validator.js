const Joi = require("joi");
const { validationMiddleware } = require("./middleware");

const searchSchema = Joi.object()
  .keys({
    name: Joi.string(),
    ingredients: Joi.array().min(1).items(Joi.string().length(24)),
    tags: Joi.array().min(1).items(Joi.string().length(24)),
  })
  .or("name", "ingredients", "tags")
  .required();

exports.search = validationMiddleware(searchSchema);
