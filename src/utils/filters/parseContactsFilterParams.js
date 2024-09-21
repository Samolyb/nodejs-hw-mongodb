import { parseContactType, parseIsFavourite } from "../filters/parseNumber.js";

export const parseTypeFilterParams = ({ type }) => {
    const isType = parseContactType(type);
    return isType;
};

export const parseIsFavouriteParams = (value) => {
    const isFavourite = parseIsFavourite(value);
    return isFavourite;
};

export const parseContactsFilterParams = (query = {}) => {
    const { contactType, isFavourite } = query;

    const filter = {};
    if (contactType) filter.contactType = contactType;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

    return filter;
};