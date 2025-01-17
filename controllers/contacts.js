const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");
// ------------------------------
// мій варіант
// const getAllContacts = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 5 } = req.query;
//   const skip = (page - 1) * limit;
//   const match = {};
//   if (req.query.favorite) {
//     match.favorite = req.query.favorite === "true";
//   }
//   const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
//     skip,
//     limit,
//   })
//     .where(match)
//     .populate("owner", " email");
//   res.json(result);
// };

// альтернативний варіант, але мій варіант працює
// const getAllContacts = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { favorite = [true, false], page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   const queryParams = { owner, favorite: favorite };
//   const result = await Contact.find(queryParams, "-createdAt -updatedAt", {
//     skip,
//     limit,
//   }).populate("owner", " email");
//   res.json(result);
// };

// версія від штучного інтелекту
const getAllContacts = async (req, res) => {
  const userId = req.user._id;
  const query = { owner: userId };
  const { page = 1, limit = 10, favorite = null } = req.query;
  if (favorite !== null) {
    query.favorite = favorite;
  }
  const skip = (page - 1) * limit;

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  })
    .populate("owner", " email")
    .exec();
  const count = await Contact.countDocuments(query);
  res.json({ result, totalPages: Math.ceil(count / limit), currentPage: page });
};
// -----
const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner: owner });
  // const result = await Contact.findOne(contactId);
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

  const result = await Contact.findOneAndDelete({
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
