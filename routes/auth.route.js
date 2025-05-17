const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/signUp").post(authController.signUp);
// router.route("/logIn").post(authMiddleware.antiByPass, authController.login);
router.route("/refreshToken").post(authController.refreshToken);
router.route("/validateJWT").post(authController.validateJWT);
// router.route("/checkAccount").post(authController.checkAccount);
// router.route("/logOut").post(authController.logout);
// router.route("/isEmailAvailable").get(authController.isEmailAvailable);
// router.route("/checkEmailAvailable").get(authController.isEmailAvailable);
// router.route("/identityVerification").post(authController.identityVerification);
module.exports = router;
