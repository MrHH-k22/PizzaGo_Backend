const OrderDAO = require("../DAO/orderDAO.js");

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
