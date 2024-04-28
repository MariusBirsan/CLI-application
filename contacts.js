import { readFile } from "node:fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}\\db\\contacts.json`;

//CRUD

//READ
export async function listContacts() {
  try {
    // console.log("GET Contacts".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (err) {
    console.log("There is an error".bgRed.white);
    console.error(err.message);
  }
}

function getContactsById(contactId) {}

function removeContact(contactId) {}

export async function addContact(name, email, phone) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const newContactId = randomUUID();
    const isValid = name && email && phone;
    if (!isValid) {
      throw new Error("The contact does not have all required parameters");
    }
    const newContact = {
      id: newContactId,
      name: name,
      email: email,
      phone: phone,
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

// listContacts();
// getContactsById();
// removeContact();
// addContact("Marius", "basd@gmail.com", "0742304959");
