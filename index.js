import {
  addContact,
  listContacts,
  getContactsById,
  removeContact,
} from "./contacts.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const scriptName = "node index.js";

yargs(hideBin(process.argv))
  .scriptName(scriptName)
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => invokeAction({ action: "list" }),
  })
  .command({
    command: "get <id>",
    describe: "Get contact by ID",
    builder: (yargs) => yargs.positional("id", { describe: "Contact ID" }),
    handler: (argv) => invokeAction({ action: "get", id: argv.id }),
  })
  .command({
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    builder: (yargs) => {
      yargs.positional("name", { describe: "Contact name" });
      yargs.positional("email", { describe: "Contact email" });
      yargs.positional("phone", { describe: "Contact phone number" });
    },
    handler: (argv) =>
      invokeAction({
        action: "add",
        name: argv.name,
        email: argv.email,
        phone: argv.phone,
      }),
  })
  .command({
    command: "remove <id>",
    describe: "Remove contact by ID",
    builder: (yargs) => yargs.positional("id", { describe: "Contact ID" }),
    handler: (argv) => invokeAction({ action: "remove", id: argv.id }),
  })
  .demandCommand(1, "You need at least one command before moving on")
  .strict()
  .help().argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      const hasId = id;
      if (!hasId) {
        console.log(`For searching a contact we need an 'id'!`.bgRed);
      }
      getContactsById(id);
      break;

    case "add":
      if (action === "add") {
        const hasAllArguments = name && email && phone;
        if (!hasAllArguments) {
          console.log(
            `For adding a new contact we need 'name', 'email' and 'phone'`.bgRed
          );
        }
      }
      addContact(name, email, phone);
      break;

    case "remove":
      const hasID = id;
      if (!hasID) {
        console.log(`TO delete a contact we need a valid 'id'!`.bgRed);
      }
      removeContact(id);
      break;

    default:
      console.log(`This command ${action} is not supported`.bgYellow);
  }
}
