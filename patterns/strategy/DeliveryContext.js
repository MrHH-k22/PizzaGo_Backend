class DeliveryContext {
  constructor() {
    this.deliveryStrategy = null;
  }

  setDeliveryStrategy(strategy) {
    this.deliveryStrategy = strategy;
  }

  calculateShippingCost(items, totalFoodPrice) {
    if (!this.deliveryStrategy) {
      throw new Error("Delivery strategy not set");
    }
    return this.deliveryStrategy.calculateShippingCost(items, totalFoodPrice);
  }
}

module.exports = DeliveryContext;
