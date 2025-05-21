// strategies/delivery/DeliveryStrategy.js
class DeliveryStrategy {
  constructor() {
    if (this.constructor === DeliveryStrategy) {
      throw new Error(
        "Abstract class 'DeliveryStrategy' cannot be instantiated"
      );
    }
  }

  calculateDeliveryCost(order) {
    throw new Error("Method 'calculateDeliveryCost' must be implemented");
  }

  estimateDeliveryTime(order) {
    throw new Error("Method 'estimateDeliveryTime' must be implemented");
  }

  validateDeliveryInfo(address) {
    throw new Error("Method 'validateDeliveryInfo' must be implemented");
  }

  processDelivery(order) {
    throw new Error("Method 'processDelivery' must be implemented");
  }
}

module.exports = DeliveryStrategy;
