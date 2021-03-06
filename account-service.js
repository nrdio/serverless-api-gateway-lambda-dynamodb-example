const AccountRepository = require('./account-repository').AccountRepository;
const accountRepository = new AccountRepository();

class AccountService {

    async createAccount(accountRequest) {
        try {
            return accountRepository.createAccount(accountRequest);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getAccount(id) {
        try {
            return accountRepository.getAccount(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getAccounts() {
        try {
            return accountRepository.getAccounts();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async updateAccount(id, accountUpdateRequest) {
        try {
            return accountRepository.updateAccount(id, accountUpdateRequest);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async deleteAccount(id) {
        try {
            return accountRepository.deleteAccount(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}

exports.AccountService = AccountService;