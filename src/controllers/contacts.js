import createError from 'http-errors';
import Contact from '../models/contact.js';

export const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json({
        status: 200,
        message: 'Success',
        data: contacts,
    });
};

export const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
        throw createError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: 'Success',
        data: contact,
    });
};

export const addContact = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact,
    });
};

export const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!updatedContact) {
        throw createError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact,
    });
};

export const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
        throw createError(404, 'Contact not found');
    }

    res.status(204).end();
};