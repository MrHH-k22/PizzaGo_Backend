const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
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

module.exports.deleteOldImage = (filename) => {
  try {
    if (filename) {
      const imagePath = path.join(
        __dirname,
        "../public/foodImage",
        filename
      ); // Adjust path as needed
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  } catch (error) {
    console.error("Error deleting old image:", error);
  }
};
