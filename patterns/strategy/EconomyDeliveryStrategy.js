const DeliveryStrategy = require("./DeliveryStrategy");

class EconomyDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    // Tính tổng số lượng sản phẩm
    console.log("Calculating Economy Delivery cost...");
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    // Áp dụng quy tắc tính phí Economy Delivery
    if (totalQuantity > 6) {
      return totalFoodPrice * 0.15; // 15% giá đồ ăn
    } else {
      return totalFoodPrice * 0.1; // 10% giá đồ ăn
    }
  }
}

module.exports = EconomyDeliveryStrategy;
