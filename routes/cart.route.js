const express = require("express");
const router = express.Router({ mergeParams: true });
const cartController = require("../controllers/cart.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/addToCart")
  .post(authMiddleware.isLogin, cartController.addToCart);

router.route("/getCart").get(authMiddleware.isLogin, cartController.getCart);

router
  .route("/updateQuantity")
  .patch(authMiddleware.isLogin, cartController.updateQuantity);

router
  .route("/removeFromCart")
  .post(authMiddleware.isLogin, cartController.removeFromCart);

module.exports = router;
