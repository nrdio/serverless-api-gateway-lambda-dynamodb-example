const uuid = require("uuid");
const dynamoDbClient = require('./dynamodb-client');

// Get account table name from env variable configured through serverless.yml
const ACCOUNT_TABLE = process.env.ACCOUNT_TABLE;

class AccountRepository {

    async createAccount(accountRequest) {
        try {
            // Prepare account item
            const timeStamp = new Date().getTime();
            const accountItem = {
                TableName: ACCOUNT_TABLE,
                Item: {
                    id: uuid.v1(),
                    name: accountRequest.name,
                    iban: accountRequest.iban,
                    createdAt: timeStamp,
                    updatedAt: timeStamp
                }
            };

            const client = await dynamoDbClient.dynamoDbClient();

            console.log("Registering new account");

            // insert account in DynamoDB
            await client.put(accountItem).promise();

            console.log("Registered new account with id " + accountItem.Item.id);

            return accountItem.Item;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getAccount(id) {
        try {
            // Prepare get account query
            const accountParams = {
                TableName: ACCOUNT_TABLE,
                Key: {
                    id: id
                }
            };

            const client = await dynamoDbClient.dynamoDbClient();

            console.log("Retrieving account with id " + id);

            // get account from DynamoDB
            const accountItem = await client.get(accountParams).promise();

            console.log("Retrieved account with id " + id);

            return accountItem.Item;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getAccounts() {
        try {
            // Prepare account scan query
            const accountParams = {
                TableName: ACCOUNT_TABLE,
            };

            const client = await dynamoDbClient.dynamoDbClient();

            console.log("Retrieving accounts");

            // get account from DynamoDB
            const accountItems = await client.scan(accountParams).promise();

            console.log("Retrieved accounts");

            return accountItems.Items;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async updateAccount(id, accountUpdateRequest) {
        try {
            // Prepare update account query
            const timeStamp = new Date().getTime();
            const accountItem = {
                TableName: ACCOUNT_TABLE,
                Key: {
                    id: id,
                },
                ExpressionAttributeNames: {
                    '#account_name': 'name',
                },
                ExpressionAttributeValues: {
                    ':newName': accountUpdateRequest.name,
                    ':newIban': accountUpdateRequest.iban,
                    ':updatedAt': timeStamp
                },
                UpdateExpression: 'SET #account_name = :newName, iban = :newIban, updatedAt = :updatedAt',
                ReturnValues: 'NONE'
            };

            const client = await dynamoDbClient.dynamoDbClient();

            console.log("Updating account with id " + id);

            // insert account in DynamoDB
            await client.update(accountItem).promise();

            console.log("Updated account with id " + id);

            return accountItem.Item;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async deleteAccount(id) {
        try {
            // Prepare delete account query
            const accountParams = {
                TableName: ACCOUNT_TABLE,
                Key: {
                    id: id
                }
            };

            const client = await dynamoDbClient.dynamoDbClient();

            console.log("Deleting account with id " + id);

            // delete account from DynamoDB
            await client.delete(accountParams).promise();

            console.log("Deleted account with id " + id);

            return;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

exports.AccountRepository = AccountRepository;