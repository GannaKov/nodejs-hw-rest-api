// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact"); //
// ------------------------------

const getAllContacts = async (req, res) => {
  console.log("hier");
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};
// ----
const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId }); for me to remember
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found ");
  }
  res.json(result);
};
// // ----
const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
// // -----
// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "contact deleted",
//   });
// };
// // -----
// const changeContact = async (req, res) => {
//   const { contactId } = req.params;

//   if (!req.body.name && !req.body.email && !req.body.phone) {
//     // if (!req.body) doesn`t work

//     res.status(400).json({ message: "missing fields" });
//     return;
//   }
//   const result = await updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// ---------------------

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // changeContact: ctrlWrapper(changeContact),
};
