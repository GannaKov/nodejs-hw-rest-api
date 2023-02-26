const fs = require("fs/promises");
const path = require("path");

// const short = require("short-uuid");

const contactsPath = path.resolve("./contacts.json");
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(data));
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
