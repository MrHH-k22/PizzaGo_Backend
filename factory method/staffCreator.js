const AccountCreator = require('./accountCreator');
const { Account } = require('../models/account');

class StaffCreator extends AccountCreator {
  _createSpecificUser(userData) {
    return new Account({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      address: userData.address || "",
      role: "Staff" 
    });
  }
}

module.exports = StaffCreator;