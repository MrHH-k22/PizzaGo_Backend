// patterns/strategy/index.js
const EconomyDeliveryStrategy = require("./EconomyDeliveryStrategy");
const FastDeliveryStrategy = require("./FastDeliveryStrategy");
const PickupStrategy = require("./PickUpStrategy");

// Enum cho các phương thức vận chuyển
const DELIVERY_METHODS = {
  FAST: "Fast Delivery",
  ECONOMY: "Economy Delivery",
  PICKUP: "Pick up",
};

// Factory function để tạo strategy phù hợp
function createDeliveryStrategy(deliveryMethod) {
  switch (deliveryMethod) {
    case DELIVERY_METHODS.FAST:
      return new FastDeliveryStrategy();
    case DELIVERY_METHODS.ECONOMY:
      return new EconomyDeliveryStrategy();
    case DELIVERY_METHODS.PICKUP:
      return new PickupStrategy();
    default:
      // Mặc định là Economy nếu không xác định
      return new EconomyDeliveryStrategy();
  }
}

module.exports = {
  createDeliveryStrategy,
  DELIVERY_METHODS,
};
