const Joi = require("joi");

const addSchemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string().min(6).max(10).required(),
});
const addSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(6).max(10),
});
module.exports = {
  addSchemaPost,
  addSchemaPut,
};
