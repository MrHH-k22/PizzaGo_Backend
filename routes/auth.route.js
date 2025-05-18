const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/signUp").post(authController.signUp);
router.route("/logIn").post(authController.logIn);
router.route("/logOut").post(authController.logOut);
router.route("/refresh-token").post(authController.refreshToken);

// router.route("/customer-endpoint")
//   .get(authMiddleware.isLogin, authMiddleware.isCustomer, customerController.method);
module.exports = router;
