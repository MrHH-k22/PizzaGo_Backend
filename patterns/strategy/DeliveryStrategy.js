class DeliveryStrategy {
  calculateShippingCost(items, totalFoodPrice) {
    throw new Error("Method must be implemented by concrete strategies");
  }
}

module.exports = DeliveryStrategy;
