const { createDeliveryStrategy } = require("./");

class DeliveryContext {
  constructor(deliveryMethod) {
    this.deliveryStrategy = createDeliveryStrategy(deliveryMethod);
  }

  calculateShippingCost(items, totalFoodPrice) {
    if (!this.deliveryStrategy) {
      throw new Error("Delivery strategy not set");
    }
    return this.deliveryStrategy.calculateShippingCost(items, totalFoodPrice);
  }
}

module.exports = DeliveryContext;
