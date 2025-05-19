const express = require("express");
const router = express.Router({ mergeParams: true });
const cartController = require("../controllers/cart.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/addToCart")
  .post(authMiddleware.isLogin, cartController.addToCart);

module.exports = router;
