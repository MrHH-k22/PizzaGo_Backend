// strategies/delivery/index.js
const DeliveryStrategy = require("./DeliveryStrategy");
const FastDeliveryStrategy = require("./FastDeliveryStrategy");
const EconomyDeliveryStrategy = require("./EconomyDeliveryStrategy");
const PickUpStrategy = require("./PickupStrategy");

// Factory function để tạo strategy dựa vào type
function createDeliveryStrategy(type) {
  switch (type) {
    case "FAST":
      return new FastDeliveryStrategy();
    case "ECONOMY":
      return new EconomyDeliveryStrategy();
    case "PICKUP":
      return new PickUpStrategy();
    default:
      return new EconomyDeliveryStrategy(); // Default strategy
  }
}

module.exports = {
  DeliveryStrategy,
  FastDeliveryStrategy,
  EconomyDeliveryStrategy,
  PickUpStrategy,
  createDeliveryStrategy,
};
