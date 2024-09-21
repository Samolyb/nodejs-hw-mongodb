import ContactCollection from "../db/models/сontacts.js";
import sortFields from "../utils/parseSortParams.js";
// import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({ perPage = 10, page = 1, sortBy = 'name', sortOrder = 'asc', filter = {} }) => {
    try {
        const skip = (page - 1) * perPage;

        if (!sortFields.includes(sortBy)) {
            throw new Error(`Invalid sort field: ${sortBy}`);
        }

        if (!SORT_ORDER.includes(sortOrder)) {
            throw new Error(`Invalid sort order: ${sortOrder}. Use 'asc' or 'desc'.`);
        }

        const sortDirection = sortOrder === 'desc' ? -1 : 1;

        const contacts = await ContactCollection.find(filter)
            .skip(skip)
            .limit(perPage)
            .sort({ [sortBy]: sortDirection });


        const count = await ContactCollection.countDocuments(filter);

        const totalPages = Math.ceil(count / perPage);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            contacts,
            page,
            perPage,
            totalItems: count,
            totalPages,
            hasPreviousPage,
            hasNextPage,
        };
    } catch (error) {
        throw new Error(`Failed to retrieve contacts: ${error.message}`);
    }
};
export const getContactById = async (id) => {
    const contacts = await ContactCollection.findById(id);
    return contacts;
};
export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);