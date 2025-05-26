const DeliveryStrategy = require("./DeliveryStrategy");

class FastDeliveryStrategy extends DeliveryStrategy {
  calculateShippingCost(totalQuantity, totalFoodPrice) {
    if (totalQuantity > 6) {
      return totalFoodPrice * 0.2;
    } else {
      return totalFoodPrice * 0.15;
    }
  }
}

module.exports = FastDeliveryStrategy;
