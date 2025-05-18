const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

// Define Role enum
const ERole = {
  CUSTOMER: "Customer",
  MANAGER: "Manager",
  STAFF: "Staff",
};

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ERole),
      default: ERole.CUSTOMER,
    },
  },
  { timestamps: true }
);

accountSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.BCRYPT_SALT || "10")
    );
  }
  next();
});

accountSchema.methods.changePassword = function (newPassword) {
  this.password = newPassword;
};

accountSchema.methods.login = function (password) {
  return bcrypt.compare(password, this.password);
};

const Account = mongoose.model("Account", accountSchema);

// Export both the model and the role enum for use elsewhere
module.exports = {
  Account,
  ERole,
};
