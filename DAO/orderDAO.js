const { Order } = require("../models/order");

class OrderDAO {
  // Get all orders with customer information
  async getAllOrders() {
    try {
      return await Order.find({})
        .populate({
          path: "customerId",
          select: "name email", // Only include non-sensitive fields
        })
        .populate({
          path: "items.foodItemId",
          select: "name description price image",
        })
        .exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: newStatus },
        { new: true } // Return the updated document
      )
        .populate({
          path: "customerId",
          select: "name email", // Only include non-sensitive fields
        })
        .populate({
          path: "items.foodItemId",
          select: "name description price image",
        });

      return updatedOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new OrderDAO();
