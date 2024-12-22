const pagination = (item, page, limit) => {
    //pagination
    page = page || 1;
    limit = limit || 8;
    const totalPages = Math.ceil(item.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    item = item.slice(startIndex, endIndex);
    const totalItems = item.length; // total teachers in this page

    const result = {
        newItems: item,
        pageInfo: {
            page: page,
            totalPages: totalPages,
            limit: limit,
            totalItemsInPage: totalItems,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
        }
    }
    return result;
}
export default pagination;