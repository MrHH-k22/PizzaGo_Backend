const express = require("express");
const router = express.Router({ mergeParams: true });
const orderController = require("../controllers/order.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/getorders").get(orderController.getOrders);

router
  .route("/updatestatus")
  .post(
    authMiddleware.isLogin,
    authMiddleware.isStaff,
    orderController.updateOrderStatus
  );

router
  .route("/create")
  .post(authMiddleware.isLogin, orderController.createOrder);

router
  .route("/getOrdersByCustomerId")
  .post(authMiddleware.isLogin, orderController.getOrdersByCustomerId);

module.exports = router;
