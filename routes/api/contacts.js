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

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
// -----------------
router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.addSchemaPost), addNewContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchemaPut),

  changeContact
);

router.patch(
  "/:contactId",
  // "/:contactId/favorite" --- doesnt work !!!????
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
