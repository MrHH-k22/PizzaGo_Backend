class AccountCreator {
  createUser(userData) {
    return this._createSpecificUser(userData);
  }
  
  _createSpecificUser(userData) {
    throw new Error("Method _createSpecificUser must be implemented by subclasses");
  }
}

module.exports = AccountCreator;