const { Cart } = require("../models/cart");

class CartDAO {
  // Hàm tìm giỏ hàng của người dùng theo customerId
  async findCartByCustomerId(customerId) {
    try {
      const cart = await Cart.findOne({ customerId }).populate(
        "items.foodItemId"
      );
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async saveCart(cart) {
    try {
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Lỗi khi lưu giỏ hàng:", error);
      throw error;
    }
  }
  async clearCart(customerId) {
    try {
      // Sử dụng updateOne để set items thành mảng rỗng trực tiếp
      const result = await Cart.updateOne(
        { customerId: customerId },
        { $set: { items: [] } }
      );

      return result;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
}

module.exports = new CartDAO();
