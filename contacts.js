const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

async function listContacts() {
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
  //   return contacts;
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (!contacts[idx]) {
    console.log(`contact id = ${contactId} no found`);
  }
  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("contact removed");
    return newContacts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newID = v4();

  contacts.push({
    id: newID,
    name,
    email,
    phone,
  });

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("operation succeeded");
    console.table({
      id: newID,
      name,
      email,
      phone,
    });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
