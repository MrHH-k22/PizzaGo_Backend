const { Order } = require("../models/order");
const OrderStatusSubject = require("../observers/OrderStatusSubject");

class OrderDAO {
  constructor() {
    this.statusSubject = new OrderStatusSubject();
  }

  // Method to register observers
  registerObserver(observer) {
    this.statusSubject.attach(observer);
  }

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

  // Update order status with observer notification
  async updateOrderStatus(orderId, newStatus) {
    try {
      // First get the order to check previous status
      const order = await Order.findById(orderId);
      if (!order) return null;

      const prevStatus = order.status;

      // Update the order status
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

      // If status actually changed, notify observers
      if (prevStatus !== newStatus && updatedOrder) {
        this.statusSubject.notify(updatedOrder, prevStatus);
      }

      return updatedOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new OrderDAO();
