const mongoose = require("mongoose");
const { Schema } = mongoose;

// Định nghĩa schema cho CartItem (embedded)
const cartItemSchema = new Schema({
  foodItemId: {
    type: Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

// Thêm methods cho cartItem
cartItemSchema.methods.calculateTotal = async function () {
  // Cần populate foodItem để lấy giá
  await this.populate("foodItemId");
  if (this.foodItemId && this.foodItemId.price) {
    return this.quantity * this.foodItemId.price;
  }
  return 0;
};

cartItemSchema.methods.editQuantity = function (newQuantity) {
  if (newQuantity > 0) {
    this.quantity = newQuantity;
  }
};

// Định nghĩa schema cho Cart
const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true, // Mỗi account chỉ có một cart
    },
    items: [cartItemSchema], // Embedding CartItems trong Cart
  },
  { timestamps: true }
);

// Thêm methods cho Cart
cartSchema.methods.addToCart = function (foodItemId, quantity = 1) {
  try {
    // Kiểm tra tính hợp lệ của tham số đầu vào
    if (!foodItemId) {
      throw new Error("FoodItemId không được để trống");
    }

    if (!Number.isInteger(quantity)) {
      quantity = Math.floor(quantity); // Chuyển đổi thành số nguyên
    }

    // Tìm sản phẩm trong giỏ hàng
    const existingItem = this.items.find(
      (item) => item.foodItemId.toString() === foodItemId.toString()
    );

    if (existingItem) {
      // Cập nhật số lượng nếu sản phẩm đã tồn tại
      existingItem.quantity += quantity;

      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      if (existingItem.quantity <= 0) {
        return this.deleteItem(foodItemId);
      }
    } else {
      // Thêm sản phẩm mới nếu chưa tồn tại và số lượng > 0
      if (quantity <= 0) {
        throw new Error("Số lượng phải lớn hơn 0 khi thêm sản phẩm mới");
      }

      this.items.push({
        foodItemId: foodItemId,
        quantity: quantity,
      });
    }

    return true; // Thành công
  } catch (error) {
    console.error("Lỗi trong phương thức addToCart:", error);
    throw error; // Ném lỗi để controller có thể xử lý
  }
};

cartSchema.methods.calculateTotal = async function () {
  let total = 0;
  for (const item of this.items) {
    await item.populate("foodItemId");
    if (item.foodItemId && item.foodItemId.price) {
      total += item.quantity * item.foodItemId.price;
    }
  }
  return total;
};

cartSchema.methods.deleteItem = function (foodItemId) {
  this.items = this.items.filter(
    (item) => item.foodItemId.toString() !== foodItemId.toString()
  );
};

cartSchema.methods.createOrder = async function (deliveryAddress, note = "") {
  const Order = mongoose.model("Order");
  const totalPrice = await this.calculateTotal();

  const newOrder = new Order({
    customerId: this.customerId,
    items: this.items.map((item) => ({
      foodItemId: item.foodItemId,
      quantity: item.quantity,
    })),
    deliveryAddress,
    note,
    status: "pending",
    totalPrice,
  });

  return newOrder.save();
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
