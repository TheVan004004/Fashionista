const resData = (message, errorCount, data) => {
    const result = {
        message: message,
        errorCount: errorCount,
        data: data
    };
    return result;
}

export default resData;