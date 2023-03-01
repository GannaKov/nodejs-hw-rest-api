// const Joi = require("joi");
// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .required()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
//   phone: Joi.string().min(6).max(10).required(),
// });
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

// ------------------------------

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};
// ----
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found ");
  }
  res.json(result);
};
// ----
const addNewContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);

  // if (error) {
  //   throw HttpError(400, error.message);
  // }

  const result = await addContact(req.body);
  res.status(201).json(result);
};
// -----
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};
// -----
const changeContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);

  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { contactId } = req.params;
  console.log(contactId);
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// ---------------------

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
};
