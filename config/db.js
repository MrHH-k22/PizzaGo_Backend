const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    if (Database.instance) {
      throw new Error("Database singleton already exists! Use getInstance()");
    }
    Database.instance = this;
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

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

  getConnection() {
    return this.connection;
  }
}

Database.instance = null;

module.exports = Database;
