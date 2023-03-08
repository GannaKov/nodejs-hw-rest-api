const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody, authentication } = require("../../middlewares");
const cntrl = require("../../controllers/auth");
// -----------------------
const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), cntrl.register);
router.post("/login", validateBody(schemas.loginSchema), cntrl.login);
router.get(
  "/current",
  authentication,

  cntrl.getCurrent
);
module.exports = router;
