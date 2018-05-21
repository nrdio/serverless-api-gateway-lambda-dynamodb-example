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

}

exports.AccountService = AccountService;