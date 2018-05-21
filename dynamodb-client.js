const AWS = require("aws-sdk");
AWS.config.update({region: "us-west-2"});

exports.dynamoDbClient = async () => {
    try {
        let options = {};

        if (process.env.IS_OFFLINE === 'true') {
            // local dynamodb client config
            options = {
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            }
        }

        // Create DynamoDB document client
        return new AWS.DynamoDB.DocumentClient(options);
    } catch (err) {
        console.log(err);
        throw err;
    }
};