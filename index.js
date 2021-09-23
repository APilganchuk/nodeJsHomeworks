const contacts = require("./contacts.js");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const oneContact = await contacts.getContactById(id);
        if (!oneContact) {
          throw new Error(`Contact id = ${id} not found`);
        }
        console.table(oneContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.table(newContact);
        console.log(`operation success, contact added`);
      } catch (error) {
        console.log(error);
      }
      break;

    case "remove":
      try {
        const delContactIdx = await contacts.removeContact(id);

        if (delContactIdx === null) {
          throw new Error(`Contact id = ${id} not found`);
        }
        console.log(`Contact id=${id} remove`);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
