const CartDAO = require("../DAO/CartDAO.js");
const OrderDAO = require("../DAO/orderDAO.js");
const { Order } = require("../models/order.js");

module.exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderDAO.getAllOrders();
    if (orders && orders.length > 0) {
      return res.status(200).json(orders);
    }
    return res.status(404).json({ message: "Cannot find any order" });
  } catch (err) {
    console.error("Error getting orders:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Validate inputs
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: "Order ID and status are required" });
    }

    const updatedOrder = await OrderDAO.updateOrderStatus(orderId, status);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// controllers/order.controller.js - Add createOrder method

module.exports.createOrder = async (req, res) => {
  try {
    const { deliveryAddress, items, note } = req.body;
    const customerId = req.user._id;

    // Validate các trường bắt buộc
    if (!customerId || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({
        message: "Customer ID, delivery address, and items are required",
      });
    }

    const formattedItems = items.map((item) => ({
      foodItemId: item.foodItemId._id,
      quantity: item.quantity,
      price: item.foodItemId.price,
    }));

    const orderInstance = Order.createOrder({
      customerId,
      deliveryAddress,
      items: formattedItems,
      note,
    });

    // Lưu instance bằng DAO
    const savedOrder = await OrderDAO.saveOrder(orderInstance);

    await CartDAO.clearCart(customerId);

    return res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
