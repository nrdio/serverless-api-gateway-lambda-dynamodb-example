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

}

exports.AccountService = AccountService;