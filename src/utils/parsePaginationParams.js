const parseInteger = (value, defaultValue) => {
    console.log(value);
    if (typeof value !== "string") return defaultValue;

    const parsedValue = parseInt(value);
    if (Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
};

const parsePaginationParams = ({ perPage, page }) => {
    const parsedPerPage = parseInteger(perPage, 4);
    const parsedPage = parseInteger(page, 2);

    return {
        perPage: parsedPerPage,
        page: parsedPage,
    };
};

export default parsePaginationParams; 