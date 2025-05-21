// strategies/delivery/FastDeliveryStrategy.js
const DeliveryStrategy = require("./DeliveryStrategy");

class FastDeliveryStrategy extends DeliveryStrategy {
  calculateDeliveryCost(order) {
    // Tính phí giao hàng nhanh dựa trên khoảng cách
    // Đây chỉ là ví dụ, bạn cần triển khai logic thực tế
    const baseDistance = this._calculateDistance(order.DeliveryAddress);
    return baseDistance * 2.5; // Hệ số cao hơn cho giao hàng nhanh
  }

  estimateDeliveryTime(order) {
    // Thời gian giao hàng nhanh
    return 30; // 30 phút
  }

  validateDeliveryInfo(address) {
    // Kiểm tra địa chỉ có nằm trong phạm vi giao hàng nhanh không
    return (
      address && address.trim() !== "" && this._isInFastDeliveryZone(address)
    );
  }

  processDelivery(order) {
    // Xử lý đơn hàng ưu tiên
    console.log(`Đơn hàng ${order._id} được xử lý với ưu tiên cao`);
    return {
      priority: "high",
      expectedTime: 30,
      message: "Đang giao hàng nhanh",
    };
  }

  // Private helper methods
  _calculateDistance(address) {
    // Thực hiện tính khoảng cách từ cửa hàng đến địa chỉ
    // Có thể sử dụng Google Maps API hoặc các dịch vụ tương tự
    return 5; // Giả sử khoảng cách là 5km
  }

  _isInFastDeliveryZone(address) {
    // Kiểm tra xem địa chỉ có nằm trong vùng giao hàng nhanh không
    return true; // Giả sử tất cả địa chỉ đều nằm trong vùng giao hàng nhanh
  }
}

module.exports = FastDeliveryStrategy;
