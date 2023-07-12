module.exports.success = (data) => {
    const response = { status: 0 };
    if (Array.isArray(data)) {
        response.results = data;
    } else {
        response.result = data;
    }
    return response;
};

module.exports.error = (code, message) => ({
    status: 1,
    errors: [{ code, message }],
});
