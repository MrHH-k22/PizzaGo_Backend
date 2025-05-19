const AccountDAO = require("../DAO/accountDAO");
const { Account } = require("../models/account");
module.exports.countByRole = async (req, res) => {
    const role = req.body.role;
    try {
        const count = await AccountDAO.countByRole(role);
        // console.log("Count by role:", count);
        return res.status(200).json(count);
    } catch (err) {
        console.error("Count by role error:", err);
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
        console.error("Get users error:", err);
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
            Role: "Customer",
        };
        console.log("User data:", userData);
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