const DeliveryStrategy = require("./DeliveryStrategy");

class FastDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity > 6) {
      return totalFoodPrice * 0.2;
    } else {
      return totalFoodPrice * 0.15;
    }
  }
}

module.exports = FastDeliveryStrategy;
