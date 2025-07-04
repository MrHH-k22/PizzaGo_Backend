const FastDeliveryStrategy = require("./FastDeliveryStrategy");
const EconomyDeliveryStrategy = require("./EconomyDeliveryStrategy");
const PickupStrategy = require("./PickUpStrategy");

// Enum cho các phương thức vận chuyển
const DELIVERY_METHODS = {
  FAST: "Fast Delivery",
  ECONOMY: "Economy Delivery",
  PICKUP: "Pick up",
};

class DeliveryFactory {
  getDelivery(deliveryMethod) {
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
}

module.exports = {
  DeliveryFactory,
  DELIVERY_METHODS,
};
