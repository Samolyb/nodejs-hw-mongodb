import ContactCollection from "../models/Contacts.js";

export const getAllContacts = async () => {
    const contacts = await ContactCollection.find();
    return contacts;
};
export const getContactById = async (id) => {
    const contacts = await ContactCollection.findById(id);
    return contacts;
};