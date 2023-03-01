const fs = require("fs/promises");
const path = require("path");

const short = require("short-uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  // const contacts = await fs.readFile(contactsPath, "utf8");
  // const contactsArr = JSON.parse(contacts);
  const contactsArr = await listContacts();
  const oneContact = contactsArr.find((contact) => contact.id === id);
  return oneContact || null;
};

const removeContact = async (id) => {
  const contactsArr = await listContacts();
  const index = contactsArr.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }
  const result = contactsArr.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return result;
};

const addContact = async (body) => {
  const contactsArr = await listContacts();
  // const contacts = await fs.readFile(contactsPath, "utf8");
  // const contactsArr = JSON.parse(contacts);
  const newContact = {
    id: short.generate("0123456789"),
    ...body,
  };
  contactsArr.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsArr, null, 2),
    "utf8"
  );
  return newContact;
};

const updateContact = async (id, body) => {
  const contactsArr = await listContacts();

  const index = contactsArr.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contactsArr[index] = { id, ...body };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsArr, null, 2),
    "utf8"
  );
  return contactsArr[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
