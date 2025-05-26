// models/order.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = require("./cartItem");
const DeliveryContext = require("../patterns/strategy/DeliveryContext");

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

orderSchema.statics.createOrder = function (orderData) {
  // Tính tổng giá đồ ăn
  const totalFoodPrice = orderData.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Create DeliveryContext with the selected shipping method
  const deliveryContext = new DeliveryContext(orderData.shippingMethod);

  // calculate shipping cost using the strategy pattern
  const shippingCost = deliveryContext.calculateShippingCost(
    orderData.items,
    totalFoodPrice
  );

  return new this({
    customerId: orderData.customerId,
    deliveryAddress: orderData.deliveryAddress,
    shippingMethod: orderData.shippingMethod || EShippingMethod.ECONOMY,
    items: orderData.items,
    note: orderData.note || "",
    status: EStatus.PENDING,
    totalFoodPrice: totalFoodPrice,
    shippingCost: shippingCost,
    totalPrice: totalFoodPrice + shippingCost,
  });
};

const Order = mongoose.model("Order", orderSchema);

// Export both the model, the status enum, and shipping method enum
module.exports = {
  Order,
  EStatus,
  EShippingMethod,
};
