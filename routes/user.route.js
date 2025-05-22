const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.route("/countByRole").post(userController.countByRole);
router.route("/getUserById").post(userController.getUserById);
router.route("/getUsers").post(userController.getUsers);
router.route("/addUser").post(userController.addUser);
router.route("/editUser").patch(userController.editUser);
router.route("/deleteUser").delete(userController.deleteUser);
router
  .route("/changePassword")
  .post(authMiddleware.isLogin, userController.changePassword);
module.exports = router;
// Compare this snippet from controllers/user.controller.js:
