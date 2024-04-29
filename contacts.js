import { readFile } from "node:fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}\\db\\contacts.json`;

async function importContacts() {
  const contacts = await readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(contacts);
}

export async function listContacts() {
  try {
    const contacts = await importContacts();
    console.table(contacts);
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}

export async function getContactsById(contactId) {
  try {
    const contacts = await importContacts();
    const contact = contacts.filter((contact) =>
      contactId.includes(contact.id)
    );

    if (!contact) {
      throw new Error("Contact has not been found!");
    }
    const contactInfo = contact[0];
    console.log(
      "Contact has been found: ".bgGreen,
      "\n",
      "ID:",
      contactInfo.id,
      "\n",
      "name:",
      contactInfo.name,
      "\n",
      "email:",
      contactInfo.email,
      "\n",
      "phone:",
      contactInfo.phone
    );
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await importContacts();
    const filteredContacts = contacts.filter(
      (contact) => contactId !== contact.id
    );

    const contact = contacts.filter((contact) =>
      contactId.includes(contact.id)
    );
    if (!contact) {
      throw new Error("Contact has not been found!");
    }
    const parsedContacts = JSON.stringify(filteredContacts);
    console.log("The contact has been successfully deleted!".bgGreen);
    await writeFile(contactsPath, parsedContacts);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await importContacts();
    const newContactId = randomUUID();
    const isValid = name && email && phone;
    if (!isValid) {
      throw new Error("The contact does not have all required parameters");
    }

    const newContact = {
      id: newContactId,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    const parsedContact = JSON.stringify(contacts);
    await writeFile(contactsPath, parsedContact);

    console.log("The contact has been added sucessfully!".bgGreen);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.log(error);
  }
}
