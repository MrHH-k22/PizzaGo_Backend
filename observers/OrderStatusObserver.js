class OrderStatusObserver {
  // Method to be implemented by concrete observers
  update(order, prevStatus) {
    throw new Error("Method 'update' must be implemented");
  }
}

module.exports = OrderStatusObserver;
