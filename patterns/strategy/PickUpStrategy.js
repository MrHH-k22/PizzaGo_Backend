const DeliveryStrategy = require("./DeliveryStrategy");

class PickupStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    return 0;
  }
}

module.exports = PickupStrategy;
