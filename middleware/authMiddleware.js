const jwt = require("jsonwebtoken");
const { Account } = require("../models/account");

// Verify user is logged in with a valid access token
exports.isLogin = async (req, res, next) => {
  try {
    // Safely access cookies object
    const cookies = req.cookies || {};
    const token =
      cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "access_secret_key"
    );

    const user = await Account.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
    }
    return res.status(401).json({ message: "Không được phép truy cập" });
  }
};

// Check if user is a customer
exports.isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "Customer") {
    return next();
  }
  return res.status(403).json({ message: "Bạn không có quyền truy cập" });
};

// Check if user is a manager
exports.isManager = (req, res, next) => {
  if (req.user && req.user.role === "Manager") {
    return next();
  }
  return res.status(403).json({ message: "Bạn không có quyền quản lý" });
};

// Check if user is staff
exports.isStaff = (req, res, next) => {
  if (req.user && req.user.role === "Staff") {
    return next();
  }
  return res.status(403).json({ message: "Bạn không có quyền nhân viên" });
};
