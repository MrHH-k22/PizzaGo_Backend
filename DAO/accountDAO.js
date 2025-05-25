const { Account } = require("../models/account");
const bcrypt = require("bcrypt");

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
      const users = await Account.find(query);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  async getEmailById(id) {
    try {
      const account = await Account.findById(id);
      return account ? account.email : null;
    } catch (error) {
      console.error("Error fetching email by ID:", error);
      throw error;
    }
  }
  async editUser(userData) {
    try {
      const { id, ...updateData } = userData;
      const updatedAccount = await Account.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedAccount;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      const deletedAccount = await Account.findByIdAndDelete(id);
      return deletedAccount;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const user = await Account.findById(id).select("-password");
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
  async changePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.BCRYPT_SALT || "10")
      );
      await Account.findByIdAndUpdate(id, {
        password: hashedPassword,
      });
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
  async saveUser(user) {
    try {
      await user.save();
      return user;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }
}

module.exports = new AccountDAO();
