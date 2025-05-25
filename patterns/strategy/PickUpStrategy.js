const DeliveryStrategy = require("./DeliveryStrategy");

class PickupStrategy extends DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    console.log("Calculating Pickup cost...");
    // Không tính phí vận chuyển với Pick up
    return 0;
  }
}

module.exports = PickupStrategy;
