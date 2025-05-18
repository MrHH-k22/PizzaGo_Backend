const { Account } = require("../models/account");

class AccountDAO {
  async isExist(email) {
    try {
      const account = await Account.findOne({ email });
      return !!account;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  }
}

module.exports = new AccountDAO();
