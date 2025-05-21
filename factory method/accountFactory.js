const CustomerCreator = require('./customerCreator');
const StaffCreator = require('./staffCreator');
const ManagerCreator = require('./managerCreator');

class AccountFactory {
  static getCreator(role) {
    switch (role) {
      case "Staff":
        return new StaffCreator();
      case "Manager":
        return new ManagerCreator();
      case "Customer":
      default:
        return new CustomerCreator();
    }
  }
  
  static createUser(userData) {
    const role = userData.role || "Customer";
    const creator = this.getCreator(role);
    return creator.createUser(userData);
  }
}

module.exports = AccountFactory;