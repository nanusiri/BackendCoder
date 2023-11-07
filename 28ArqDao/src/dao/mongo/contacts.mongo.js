import contactsModel from "./models/Contacts.js"

export default class Contacts {
    constructor() {

    }

    get = async () => {
        let contacts = await contactsModel.find()
        return contacts
    }
}