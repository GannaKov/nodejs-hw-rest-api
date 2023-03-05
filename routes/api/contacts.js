const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getById,
  addNewContact,
  // deleteContact,
  // changeContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
// const schemas = require("../../schemas/contacts");
const { schemas } = require("../../models/contact");
// -----------------
router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchemaPost), addNewContact);
// router.post("/", addNewContact);
// router.delete("/:contactId", deleteContact);

// router.put("/:contactId", validateBody(schemas.addSchemaPut), changeContact);
module.exports = router;
