const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
  {
    email: {
      type: String,
      //   match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 digits"],
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// --------------------
const registerSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(6).required(),
});
// ----
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(6).required(),
});
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
// ------------------------------
const User = model("user", userSchema);

const schemas = { registerSchema, loginSchema, updateSubscriptionSchema };
module.exports = { User, schemas };
