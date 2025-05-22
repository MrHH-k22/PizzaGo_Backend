// models/order.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = require("./cartItem");

// Define Order Status enum according to the diagram
const EStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DELIVERING: "delivering",
  COMPLETED: "completed",
};

// Thêm enum cho phương thức vận chuyển
const EShippingMethod = {
  FAST: "Fast Delivery",
  ECONOMY: "Economy Delivery",
  PICKUP: "Pick up",
};

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: Object.values(EShippingMethod),
      default: EShippingMethod.ECONOMY,
    },
    items: {
      type: [cartItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "Order must have at least one item"],
    },
    note: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(EStatus),
      default: EStatus.PENDING,
    },
    totalFoodPrice: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Strategy pattern implementation - Method để thiết lập chiến lược vận chuyển
orderSchema.methods.setDeliveryStrategy = function (deliveryStrategy) {
  this.deliveryStrategy = deliveryStrategy;
  return this; // Hỗ trợ method chaining
};

// Method để tính phí vận chuyển sử dụng strategy hiện tại
orderSchema.methods.calculateShippingCost = function () {
  if (!this.deliveryStrategy) {
    throw new Error("Delivery strategy not set");
  }

  return this.deliveryStrategy.calculateShippingCost(
    this.items,
    this.totalFoodPrice
  );
};

// Static method để tạo order với strategy pattern
orderSchema.statics.createOrder = function (orderData) {
  // Tính tổng giá từ các items
  const totalFoodPrice = orderData.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Tạo instance mới của Order
  const order = new this({
    customerId: orderData.customerId,
    deliveryAddress: orderData.deliveryAddress,
    shippingMethod: orderData.shippingMethod || EShippingMethod.ECONOMY,
    items: orderData.items,
    note: orderData.note || "",
    status: EStatus.PENDING,
    totalFoodPrice: totalFoodPrice,
    shippingCost: 0, // Sẽ được tính sau bằng strategy
    totalPrice: 0, // Sẽ được tính sau khi có phí vận chuyển
  });

  // Import strategy factory tại đây để tránh circular dependencies
  const { createDeliveryStrategy } = require("../patterns/strategy");

  // Thiết lập strategy dựa trên phương thức vận chuyển
  const deliveryStrategy = createDeliveryStrategy(orderData.shippingMethod);
  order.setDeliveryStrategy(deliveryStrategy);

  // Tính phí vận chuyển sử dụng strategy
  const shippingCost = order.calculateShippingCost();

  // Cập nhật order với phí vận chuyển và tổng giá
  order.shippingCost = shippingCost;
  order.totalPrice = totalFoodPrice + shippingCost;

  return order;
};

const Order = mongoose.model("Order", orderSchema);

// Export both the model, the status enum, and shipping method enum
module.exports = {
  Order,
  EStatus,
  EShippingMethod,
};
