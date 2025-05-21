const { Order } = require("../models/order");
const { createDeliveryStrategy } = require("../patterns/strategy");

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

  async getOrderById(orderId) {
    try {
      return await Order.findById(orderId)
        .populate({
          path: "customerId",
          select: "name email", // Only include non-sensitive fields
        })
        .populate({
          path: "items.foodItemId",
          select: "name description price image",
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateOrderStatusById(orderId, status) {
    try {
      return await Order.findByIdAndUpdate(
        orderId,
        { status },
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async saveOrder(orderInstance) {
    try {
      const savedOrder = await orderInstance.save();

      // Sử dụng mảng để populate nhiều đường dẫn cùng lúc thay vì method chaining
      return await savedOrder.populate([
        {
          path: "customerId",
          select: "name email",
        },
        {
          path: "items.foodItemId",
          select: "name description price image",
        },
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new OrderDAO();
