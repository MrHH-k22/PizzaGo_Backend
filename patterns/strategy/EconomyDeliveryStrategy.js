const DeliveryStrategy = require("./DeliveryStrategy");

class EconomyDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(totalQuantity, totalFoodPrice) {
    if (totalQuantity > 6) {
      return totalFoodPrice * 0.1;
    } else {
      return totalFoodPrice * 0.05;
    }
  }
}

module.exports = EconomyDeliveryStrategy;
