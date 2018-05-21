exports.helloWorld = async(event) => {
    try {

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello World',
                input: event,
            }),
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
