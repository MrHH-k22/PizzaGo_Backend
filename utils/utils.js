const jwt = require("jsonwebtoken");

module.exports.generateUniqueAccountNumber = async () => {
  let accountNumber;
  let exists = true;

  while (exists) {
    const timestampPart = Date.now().toString().slice(-8);
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    accountNumber = `${timestampPart}${randomPart}`;

    exists = await CheckingAccount.exists({ accountNumber });
  }

  return accountNumber;
};
