const Joi = require("joi");
const { validationMiddleware } = require("./middleware");

const searchSchema = Joi.object()
  .keys({
    name: Joi.string(),
    ingredients: Joi.array().min(1).items(Joi.string().length(24)),
    tags: Joi.array().min(1).items(Joi.string().length(24)),
    ids: Joi.array().min(1).items(Joi.string().length(24)),
  })
  .or("name", "ingredients", "tags", "ids")
  .required();

const createSchema = Joi.object()
  .keys({
    recipe: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().allow(null, ""),
      instructions: Joi.array().optional(),
      ingredients: Joi.array().optional(),
      image: Joi.string().allow(null, ""),
      tags: Joi.array().optional(),
    }),
  })
  .required();

module.exports = {
  search: validationMiddleware(searchSchema),
  create: validationMiddleware(createSchema),
};
