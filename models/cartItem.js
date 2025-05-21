const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho CartItem
const cartItemSchema = new Schema({
  foodItemId: {
    type: Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

// Các methods cơ bản cho cartItem
cartItemSchema.methods.calculateTotal = function () {
  // Nếu có price trực tiếp trong item (Order model)
  if (this.price) {
    return this.quantity * this.price;
  }
  return 0; // Cần populate để lấy giá (Cart model)
};

cartItemSchema.methods.calculateTotalAsync = async function () {
  // Populate foodItem để lấy giá
  await this.populate("foodItemId");
  if (this.foodItemId && this.foodItemId.price) {
    return this.quantity * this.foodItemId.price;
  }
  return 0;
};

cartItemSchema.methods.increaseQuantity = function (amount = 1) {
  if (amount > 0) {
    this.quantity += amount;
  }
  return this;
};

cartItemSchema.methods.decreaseQuantity = function (amount = 1) {
  if (amount > 0) {
    this.quantity -= amount;
    if (this.quantity < 1) {
      this.quantity = 1; // Đảm bảo số lượng không âm
    }
  }
  return this;
};

module.exports = cartItemSchema;
