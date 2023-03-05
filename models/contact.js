const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// ------------------

const addSchemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string().min(6).max(10).required(),
  // .validate()
  favorite: Joi.boolean,
});
// ---------------------
const addSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(6).max(10),
});
// ----------------------
const contactSchema = new Schema(
  {
    name: { type: String, required: true }, // String is shorthand for {type: String}
    email: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      minLength: [6, "Phonenumbe must be at least 6 digits"],
      maxLength: [10, "Phonenumbe must be maximum 10 digits"],
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const schemas = { addSchemaPost, addSchemaPut };
module.exports = { Contact, schemas };
