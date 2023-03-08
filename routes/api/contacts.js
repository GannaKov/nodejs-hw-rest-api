const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getById,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  authentication,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");
// -----------------
router.get("/", authentication, getAllContacts);

router.get("/:contactId", authentication, isValidId, getById);

router.post(
  "/",
  authentication,
  validateBody(schemas.addSchemaPost),
  addNewContact
);

router.delete("/:contactId", authentication, isValidId, deleteContact);

router.put(
  "/:contactId",
  authentication,
  isValidId,
  validateBody(schemas.addSchemaPut),
  changeContact
);

router.patch(
  // "/:contactId",
  "/:contactId/favorite",
  authentication,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
