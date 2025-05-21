const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = require("./cartItem"); // Import schema đã tách

// Định nghĩa schema cho Cart
const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true, // Mỗi account chỉ có một cart
    },
    items: [cartItemSchema], // Sử dụng schema đã tách
  },
  { timestamps: true }
);

// Thêm methods cho Cart
cartSchema.methods.addToCart = function (foodItemId, quantity = 1) {
  // Kiểm tra tính hợp lệ của tham số đầu vào
  if (!foodItemId) {
    throw new Error("FoodItemId không được để trống");
  }

  if (!Number.isInteger(quantity)) {
    quantity = Math.floor(quantity); // Chuyển đổi thành số nguyên
  }

  // Thêm sản phẩm mới vào giỏ hàng
  this.items.push({
    foodItemId: foodItemId,
    quantity: quantity,
  });

  return true;
};

cartSchema.methods.calculateTotal = async function () {
  let total = 0;
  for (const item of this.items) {
    total += await item.calculateTotalAsync(); // Sử dụng phương thức async
  }
  return total;
};

cartSchema.methods.deleteItem = function (itemId) {
  this.items = this.items.filter(
    (item) => item._id.toString() !== itemId.toString()
  );
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
