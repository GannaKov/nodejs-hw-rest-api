const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");
// ------------------------------

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const match = {};
  if (req.query.favorite) {
    match.favorite = req.query.favorite === "true";
  }
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  })
    .where(match)
    .populate("owner", " email");
  res.json(result);
};

// -----
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
// // -----
const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner: owner,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
    status: "200",
  });
};
// // -----
const changeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: owner,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// ---------------------
const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: owner,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// -----------------
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
