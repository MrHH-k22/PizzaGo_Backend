const { Account } = require("../models/account");
const AccountDAO = require("../DAO/accountDAO");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/utils");
const COOKIE_OPTIONS = require("../config/cookieOptions");
const RefreshTokenDAO = require("../DAO/RefreshTokenDAO");

module.exports.signUp = async (req, res) => {
  try {
    const userData = {
      name: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      Role: "Customer",
    };

    const isExist = await AccountDAO.isExist(userData.email);
    if (isExist) {
      return res.status(500).json({ message: "Email đã tồn tại" });
    } else {
      const newAccount = new Account(userData);
      await newAccount.save();
      return res.status(201).json({ message: "Tạo tài khoản thành công" });
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token)
    return res.status(401).json({ message: "Bạn không được xác thực" });

  try {
    const found = await RefreshTokenDAO.fetchRefreshToken(token);
    if (!found) throw new Error("Token làm mới không hợp lệ");

    jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        res.clearCookie("refreshToken");
        return res.status(403).json({ message: "Token không hợp lệ" });
      }

      const newAccessToken = generateAccessToken(user);
      res.cookie("accessToken", newAccessToken, COOKIE_OPTIONS.normal);
      return res.status(200).json({ message: "Làm mới token thành công" });
    });
  } catch {
    res.clearCookie("refreshToken");
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

module.exports.validateJWT = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.clearCookie("accessToken", COOKIE_OPTIONS.normal);
    return res
      .status(401)
      .json({ message: "Không được phép - Không có token" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res.status(403).json({
          message: "Không được phép - Token không hợp lệ hoặc đã hết hạn",
        });

      return res.status(200).json({ message: "Xác thực thành công" });
    });
  } catch {
    return res.status(403).json({
      message: "Không được phép - Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
