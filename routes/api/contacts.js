const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getById,
  addNewContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
// -----------------
router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchema), addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(schemas.addSchema), changeContact);

module.exports = router;
