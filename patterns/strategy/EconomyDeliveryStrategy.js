// strategies/delivery/EconomyDeliveryStrategy.js
const DeliveryStrategy = require("./DeliveryStrategy");

class EconomyDeliveryStrategy extends DeliveryStrategy {
  calculateDeliveryCost(order) {
    const baseDistance = this._calculateDistance(order.DeliveryAddress);
    return baseDistance * 1.2; // Hệ số thấp hơn cho giao hàng tiết kiệm
  }

  estimateDeliveryTime(order) {
    return 60; // 60 phút
  }

  validateDeliveryInfo(address) {
    return address && address.trim() !== "";
  }

  processDelivery(order) {
    console.log(`Đơn hàng ${order._id} được xử lý với ưu tiên thông thường`);
    return {
      priority: "normal",
      expectedTime: 60,
      message: "Đang giao hàng tiết kiệm",
    };
  }

  _calculateDistance(address) {
    return 5; // Giả sử khoảng cách là 5km
  }
}

module.exports = EconomyDeliveryStrategy;
