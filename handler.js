exports.getAccount = async(event) => {
    try {

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Account retrieved successfully',
                input: event,
            }),
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
