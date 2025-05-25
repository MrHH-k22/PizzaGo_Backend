const DeliveryStrategy = require("./DeliveryStrategy");

class FastDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    // Tính tổng số lượng sản phẩm
    console.log("Calculating Fast Delivery cost...");
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    // Áp dụng quy tắc tính phí Fast Delivery
    if (totalQuantity > 6) {
      return totalFoodPrice * 0.25; // 25% giá đồ ăn
    } else {
      return totalFoodPrice * 0.2; // 20% giá đồ ăn
    }
  }
}

module.exports = FastDeliveryStrategy;
