const CartDAO = require("../DAO/CartDAO.js");
const OrderDAO = require("../DAO/orderDAO.js");
const { Account } = require("../models/account.js");
const { Order } = require("../models/order.js");
const OrderStatusSubject = require("../patterns/observers/OrderStatusSubject.js");

// Tạo một instance của Subject để sử dụng trong controller
const statusSubject = new OrderStatusSubject();

// Đăng ký observer với Subject này ở app.js sau khi khởi tạo
module.exports.registerObserver = (observer) => {
  statusSubject.attach(observer);
};

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

    // First get the order to check previous status
    const order = await OrderDAO.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const prevStatus = order.status;

    // Update the order status
    const updatedOrder = await OrderDAO.updateOrderStatusById(orderId, status);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If status actually changed, notify observers
    if (prevStatus !== status && updatedOrder) {
      statusSubject.notify(updatedOrder, prevStatus);
    }

    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { deliveryAddress, items, note, shippingMethod } = req.body;
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

    // Tạo order sử dụng Order model với Strategy Pattern
    const orderInstance = Order.createOrder({
      customerId,
      deliveryAddress,
      shippingMethod,
      items: formattedItems,
      note,
    });

    // Lưu order bằng DAO
    const savedOrder = await OrderDAO.saveOrder(orderInstance);

    // Xóa giỏ hàng sau khi tạo đơn hàng thành công
    await CartDAO.clearCart(customerId);

    return res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add this function to the existing exports
module.exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Validate input
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }
    const user = await Account.findById(customerId);
    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Get orders from DAO
    const orders = await OrderDAO.getOrdersByCustomerId(customerId);

    if (orders && orders.length > 0) {
      return res.status(200).json(orders);
    }

    // Return empty array instead of 404 for no orders
    return res.status(200).json([]);
  } catch (err) {
    console.error("Error getting customer orders:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
