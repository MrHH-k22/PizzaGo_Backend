// patterns/strategy/DeliveryContext.js
const { createDeliveryStrategy } = require("./");

class DeliveryContext {
  constructor(deliveryMethod) {
    this.deliveryStrategy = createDeliveryStrategy(deliveryMethod);
  }

  // Method để thay đổi strategy runtime
  setDeliveryStrategy(deliveryMethod) {
    this.deliveryStrategy = createDeliveryStrategy(deliveryMethod);
  }

  // Delegate việc tính phí vận chuyển cho strategy
  calculateShippingCost(items, totalFoodPrice) {
    if (!this.deliveryStrategy) {
      throw new Error("Delivery strategy not set");
    }
    return this.deliveryStrategy.calculateShippingCost(items, totalFoodPrice);
  }

  // Method để lấy thông tin delivery method hiện tại
  getCurrentDeliveryMethod() {
    return this.deliveryStrategy.constructor.name;
  }
}

module.exports = DeliveryContext;
