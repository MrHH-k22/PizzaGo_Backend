const AccountDAO = require("../DAO/accountDAO");
const { Account } = require("../models/account");
module.exports.countByRole = async (req, res) => {
  const role = req.body.role;
  try {
    const count = await AccountDAO.countByRole(role);
    // console.log("Count by role:", count);
    return res.status(200).json(count);
  } catch (err) {
    // console.error("Count by role error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.getUsers = async (req, res) => {
  const { role } = req.body;
  // console.log(role, itemsPerPage, offset);
  try {
    const users = await AccountDAO.getUsers(role);
    // console.log("Users:", users);
    return res.status(200).json(users);
  } catch (err) {
    // console.error("Get users error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.addUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address || "",
      role: req.body.role || "Customer",
    };
    // console.log("User data:", userData);
    const isExist = await AccountDAO.isExist(userData.email);
    if (isExist) {
      return res.status(500).json({ message: "Email has existed" });
    } else {
      const newAccount = new Account(userData);
      await newAccount.save();
      return res.status(201).json({ message: "Add user successfully" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports.editUser = async (req, res) => {
  // console.log("Edit user data:", req.body);
  try {
    console.log("Edit user data:", req.body);
    const userData = {
      id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address || "",
      role: req.body.role || "Customer",
    };
    // console.log("User data:", userData);
    const findEmailById = await AccountDAO.getEmailById(req.body._id);
    const isExist = await AccountDAO.isExist(userData.email);
    if (findEmailById === userData.email || !isExist) {
      const updatedAccount = await AccountDAO.editUser(userData);
      return res.status(201).json({ message: "Edit user successfully" });
    } else {
      return res.status(500).json({ message: "Email has existed" });
    }
  } catch (err) {
    // console.error("Edit user error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  // console.log("Delete user data:", req.body.userId);
  try {
    const userId = req.body.userId;
    const deletedAccount = await AccountDAO.deleteUser(userId);
    if (!deletedAccount) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Delete user successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.getUserById = async (req, res) => {
  // console.log("Get user by ID data:", req.body.userId);
  try {
    const userId = req.body.userId;
    const user = await AccountDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    // console.error("Get user by ID error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.changePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    // Validate input
    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ message: "User ID and new password are required" });
    }

    // Find the user
    const User = await AccountDAO.getUserById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Security check: Ensure users can only change their own password
    if (
      req.user._id.toString() !== userId.toString() ||
      req.user._id.toString() !== User._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not authorized to change this user's password",
      });
    }

    // Change password and save
    await AccountDAO.changePassword(userId, newPassword);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ error: err.message });
  }
};
