const pagination = (items, page, limit) => {
    //pagination
    page = page || 1;
    limit = limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = items.slice(startIndex, endIndex);
    return result;
}
export default pagination;