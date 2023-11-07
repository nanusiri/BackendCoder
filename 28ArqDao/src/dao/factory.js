import mongoose from "mongoose";
import config from "../config/config.js"

export let Contacts
switch (config.persistence) {
    case "MONGO":

        const connection = mongoose.connect("mongodb+srv://nanualejandro:UaQAnwVjBAMsE6PN@coderhouse.brwecw3.mongodb.net/?retryWrites=true&w=majority")
        const { default: ContactsMongo } = await import("./mongo/contacts.mongo.js")
        Contacts = ContactsMongo

        break;
    case "MEMORY":
        const { default: ContactsMemory } = await import("./memory/contacts.memory.js")
        Contacts = ContactsMemory

        break

    default:

}