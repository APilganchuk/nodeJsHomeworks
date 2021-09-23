const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, `db/contacts.json`);
const { v4 } = require("uuid");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((item) => item.id === contactId);

  if (!oneContact) {
    return null;
  }
  return oneContact;
}
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const delContactIdx = allContacts.findIndex((item) => item.id === contactId);
  console.log(delContactIdx);

  if (delContactIdx === -1) {
    return null;
  }
  allContacts.splice(delContactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return delContactIdx;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newId = allContacts.length + 1;
  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
