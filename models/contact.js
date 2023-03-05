const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
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

module.exports = Contact;
