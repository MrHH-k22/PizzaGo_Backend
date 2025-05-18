const { Account } = require("../models/account");
const AccountDAO = require("../DAO/accountDAO");
const COOKIE_OPTIONS = require("../config/cookieOptions");
const { generateAccessToken, generateRefreshToken } = require("../utils/utils");

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

module.exports.logIn = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const loginData = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    // Check if account exists
    const account = await Account.findOne({ email: loginData.email });
    if (!account) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    // Check if role matches (if role was specified in request)
    if (loginData.role && account.role !== loginData.role) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập với vai trò này" });
    }

    // Verify password
    const isPasswordValid = await account.login(loginData.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không chính xác" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(account);
    const refreshToken = generateRefreshToken(account);

    // Set tokens as cookies
    res.cookie('accessToken', accessToken, COOKIE_OPTIONS.normal);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS.normal);

    // Return success with user data and tokens
    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: {
        id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.logOut = async (req, res) => {
  try {
    // Clear any authentication cookies
    res.clearCookie('accessToken', COOKIE_OPTIONS.normal);
    res.clearCookie('refreshToken', COOKIE_OPTIONS.normal);
    
    return res.status(200).json({ 
      message: "Đăng xuất thành công" 
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    // Get refresh token from cookies or request body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ message: "Không tìm thấy refresh token" });
    }
    
    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || "refresh_secret_key"
    );
    
    // Find user
    const user = await Account.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }
    
    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    
    // Set new tokens as cookies
    res.cookie('accessToken', newAccessToken, COOKIE_OPTIONS.normal);
    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS.normal);
    
    // Return new tokens
    return res.status(200).json({
      message: "Làm mới token thành công",
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Refresh token đã hết hạn, vui lòng đăng nhập lại" });
    }
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
