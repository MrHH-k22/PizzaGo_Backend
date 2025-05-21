// strategies/delivery/PickUpStrategy.js
const DeliveryStrategy = require("./DeliveryStrategy");

class PickUpStrategy extends DeliveryStrategy {
  calculateDeliveryCost(order) {
    return 0; // Không có phí vận chuyển
  }

  estimateDeliveryTime(order) {
    return 20; // 20 phút để chuẩn bị đơn hàng
  }

  validateDeliveryInfo(address) {
    // Không cần địa chỉ giao hàng cho pickup
    return true;
  }

  processDelivery(order) {
    console.log(`Đơn hàng ${order._id} đã sẵn sàng để khách đến lấy`);
    return {
      priority: "normal",
      expectedTime: 20,
      message: "Đơn hàng đang được chuẩn bị để khách lấy",
    };
  }
}

module.exports = PickUpStrategy;
