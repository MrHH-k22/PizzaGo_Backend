const DeliveryStrategy = require("./DeliveryStrategy");

class PickupStrategy extends DeliveryStrategy {
  calculateShippingCost(totalQuantity, totalFoodPrice) {
    return 0;
  }
}

module.exports = PickupStrategy;
