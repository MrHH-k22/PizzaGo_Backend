class DeliveryContext {
  constructor() {
    this.deliveryStrategy = null;
  }

  setDeliveryStrategy(strategy) {
    this.deliveryStrategy = strategy;
  }

  calculateShippingCost(totalQuantity, totalFoodPrice) {
    if (!this.deliveryStrategy) {
      throw new Error("Delivery strategy not set");
    }
    return this.deliveryStrategy.calculateShippingCost(
      totalQuantity,
      totalFoodPrice
    );
  }
}

module.exports = DeliveryContext;
