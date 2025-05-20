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
}
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
}
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
}
module.exports.editUser = async (req, res) => {
    // console.log("Edit user data:", req.body);
    try {
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
        }
        else{
            return res.status(500).json({ message: "Email has existed" });
        }
    } catch (err) {
        // console.error("Edit user error:", err);
        return res.status(500).json({ error: err.message });
    }
}
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
}