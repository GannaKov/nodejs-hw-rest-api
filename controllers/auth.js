const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
// -----------------------------
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ email: newUser.email, name: newUser.name });
};

// ----------------------

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Incorrect login or password");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Incorrect login or password");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};
// try {
// } catch {}
const getCurrent = async (req, res) => {
  console.log("current", req.user);
  const { email, name } = req.user;
  res.json({ email, name });
};
// ----------------------------
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
};
