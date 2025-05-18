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

// Generate access token (short-lived)
module.exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET || "access_secret_key",
    { expiresIn: '15m' } // Short expiration for security
  );
};

// Generate refresh token (longer-lived)
module.exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || "refresh_secret_key",
    { expiresIn: '7d' } // Longer expiration
  );
};
