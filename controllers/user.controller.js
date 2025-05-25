const AccountDAO = require("../DAO/accountDAO");
const { Account } = require("../models/account");
const { Cart } = require("../models/cart");
const CartDAO = require("../DAO/CartDAO");
const AccountFactory = require("../patterns/factory method/accountFactory");
module.exports.countByRole = async (req, res) => {
  const role = req.body.role;
  try {
    const count = await AccountDAO.countByRole(role);
    return res.status(200).json(count);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports.getUsers = async (req, res) => {
  const { role } = req.body;
  try {
    const users = await AccountDAO.getUsers(role);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports.addUser = async (req, res) => {
    try {
        const userData = req.body;
        const isExist = await AccountDAO.isExist(userData.email);
        if (isExist) {
            return res.status(500).json({ message: "Email has existed" });
        } else {
            const newAccount = AccountFactory.createUser(userData);
            await AccountDAO.saveUser(newAccount);
            const newCart = new Cart({
                customerId: newAccount._id,
                items: [], 
            });
            await CartDAO.saveCart(newCart);
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
  try {
    const userId = req.body.userId;
    const deleteCart = await CartDAO.deleteCart(userId);
    const deletedAccount = await AccountDAO.deleteUser(userId);
    if (!deletedAccount) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!deleteCart) {
      return res.status(404).json({ message: "Cart not found" });
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
