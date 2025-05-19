const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller.js");

router.route("/countByRole").post(userController.countByRole);
router.route("/getUsers").post(userController.getUsers);
router.route("/addUser").post(userController.addUser);
module.exports = router;
// Compare this snippet from controllers/user.controller.js: