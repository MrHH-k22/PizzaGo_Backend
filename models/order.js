const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = require("./cartItem"); // Import schema đã tách

// Define Order Status enum according to the diagram
const EStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DELIVERING: "delivering",
  COMPLETED: "completed",
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
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.statics.createOrder = function (orderData) {
  // Tính tổng giá từ các items
  const totalPrice = orderData.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Tạo instance mới của Order
  const order = new this({
    customerId: orderData.customerId,
    deliveryAddress: orderData.deliveryAddress,
    items: orderData.items,
    note: orderData.note || "",
    status: EStatus.PENDING, // Đặt status là PENDING
    totalPrice: totalPrice,
  });

  return order;
};

const Order = mongoose.model("Order", orderSchema);

// Export both the model and the status enum
module.exports = {
  Order,
  EStatus,
};
