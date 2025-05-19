const { Cart } = require("../models/cart");

module.exports.addToCart = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const { foodId, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!foodId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin sản phẩm hoặc số lượng",
      });
    }

    // Lấy ID người dùng từ request (giả sử đã được xác thực qua middleware)
    const customerId = req.user._id;

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ customerId });

    // Nếu không tìm thấy giỏ hàng, tạo mới
    if (!cart) {
      cart = new Cart({ customerId, items: [] });
    }

    // Gọi phương thức addToCart từ model Cart
    // Tất cả logic xử lý (kiểm tra sản phẩm tồn tại, cập nhật số lượng...)
    // sẽ được thực hiện trong phương thức này của model
    cart.addToCart(foodId, parseInt(quantity));

    // Lưu giỏ hàng sau khi cập nhật
    await cart.save();

    // Trả về kết quả thành công
    return res.status(200).json({
      success: true,
      message: "Thêm vào giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi thêm vào giỏ hàng",
      error: error.message,
    });
  }
};
