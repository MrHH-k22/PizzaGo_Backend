const DeliveryStrategy = require("./DeliveryStrategy");

class EconomyDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity > 6) {
      return totalFoodPrice * 0.1;
    } else {
      return totalFoodPrice * 0.05;
    }
  }
}

module.exports = EconomyDeliveryStrategy;
