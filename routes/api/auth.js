const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody, authentication, upload } = require("../../middlewares");
const cntrl = require("../../controllers/auth");
// -----------------------
const router = express.Router();
router.post("/register", validateBody(schemas.registerSchema), cntrl.register);
router.get("/verify/:verificationCode", cntrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  cntrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), cntrl.login);
router.get("/current", authentication, cntrl.getCurrent);
router.post("/logout", authentication, cntrl.logout);
router.patch(
  "/subscription",
  authentication,
  validateBody(schemas.updateSubscriptionSchema),
  cntrl.updateSubscription
);
router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  cntrl.updateAvatar
);
module.exports = router;
