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
  async countByRole(role) {
    try {
      const count = await Account.countDocuments({ role });
      return count;
    } catch (error) {
      console.error("Error counting accounts by role:", error);
      throw error;
    }
  }
  async getUsers(role) {
    try {
      const query = role ? { role } : {};
      const users = await Account.find(query)
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

module.exports = new AccountDAO();
