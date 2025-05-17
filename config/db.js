const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    this.connect();
  }

  // Phương thức kết nối đến MongoDB
  connect() {
    if (this.connection) return this.connection;

    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
      });

    this.connection = mongoose.connection;
    return this.connection;
  }

  // Phương thức lấy connection
  getConnection() {
    return this.connection;
  }
}

// Tạo một thể hiện duy nhất và export
const instance = new Database();
Object.freeze(instance);

module.exports = instance;
