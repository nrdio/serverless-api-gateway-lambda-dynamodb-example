const AccountService = require('./account-service').AccountService;
const accountService = new AccountService();

exports.createAccount = async(event) => {
    try {
        // extract request body
        const accountRequest = JSON.parse(event.body)

        // validation
        if (!accountRequest.name || !accountRequest.iban) {
            const response = {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'code':'invalid_data', 'message': 'name and iban are mandatory'})
            };
            return response;
        }

        // create new account
        const account = await accountService.createAccount(accountRequest);

        // prepare response
        const response = {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getAccount = async(event) => {
    try {
        // validation
        if (!event.pathParameters.id) {
            const response = {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'code':'invalid_data', 'message': 'account id is mandatory'})
            };
            return response;
        }

        // get account
        const account = await accountService.getAccount(event.pathParameters.id);

        // prepare response
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getAccounts = async(event) => {
    try {
        // get accounts
        const accounts = await accountService.getAccounts();

        // prepare response
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(accounts)
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.updateAccount = async(event) => {
    try {
        // extract request body
        const accountUpdateRequest = JSON.parse(event.body)

        // validation
        if (!event.pathParameters.id || !accountUpdateRequest.name || !accountUpdateRequest.iban) {
            const response = {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'code':'invalid_data', 'message': 'id, name and iban are mandatory'})
            };
            return response;
        }

        // update account
        const account = await accountService.updateAccount(event.pathParameters.id, accountUpdateRequest);

        // prepare response
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.deleteAccount = async(event) => {
    try {
        // validation
        if (!event.pathParameters.id) {
            const response = {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'code':'invalid_data', 'message': 'account id is mandatory'})
            };
            return response;
        }

        // delete account
        const account = await accountService.deleteAccount(event.pathParameters.id);

        // prepare response
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account)
        };

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};