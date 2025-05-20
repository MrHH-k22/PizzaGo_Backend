class OrderStatusSubject {
  constructor() {
    this.observers = [];
  }

  // Register an observer
  attach(observer) {
    this.observers.push(observer);
  }

  // Remove an observer
  detach(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all observers about status change
  notify(order, prevStatus) {
    for (const observer of this.observers) {
      observer.update(order, prevStatus);
    }
  }
}

module.exports = OrderStatusSubject;
