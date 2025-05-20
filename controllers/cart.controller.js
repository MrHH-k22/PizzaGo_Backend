const { Cart } = require("../models/cart");
const CartDAO = require("../DAO/CartDAO");

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
    let cart = await CartDAO.findCartByCustomerId(customerId);

    const parsedQuantity = parseInt(quantity);

    const existingItem = cart.items.find((item) => {
      // Cần kiểm tra nếu foodItemId là object (đã được populate) hoặc là ID
      const itemFoodId = item.foodItemId._id
        ? item.foodItemId._id.toString()
        : item.foodItemId.toString();
      return itemFoodId === foodId.toString();
    });

    if (existingItem) {
      existingItem.increaseQuantity(parsedQuantity);
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng
      cart.addToCart(foodId, parsedQuantity);
    }

    // Lưu giỏ hàng sau khi cập nhật
    await CartDAO.saveCart(cart);

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

module.exports.getCart = async (req, res) => {
  try {
    // Lấy ID người dùng từ request (giả sử đã được xác thực qua middleware)
    const customerId = req.user._id;

    // Tìm giỏ hàng của người dùng
    const cart = await CartDAO.findCartByCustomerId(customerId);

    if (!cart) {
      return res.status(404).json({
        message: "Giỏ hàng không tồn tại",
      });
    }

    // Trả về giỏ hàng
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy giỏ hàng",
      error: error.message,
    });
  }
};

module.exports.updateQuantity = async (req, res) => {
  try {
    const { foodId, action } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !foodId ||
      !action ||
      (action !== "increase" && action !== "decrease")
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin hoặc hành động không hợp lệ",
      });
    }

    // Lấy ID người dùng từ request
    const customerId = req.user._id;

    // Tìm giỏ hàng
    let cart = await CartDAO.findCartByCustomerId(customerId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    // Tìm sản phẩm trong giỏ hàng
    const existingItem = cart.items.find((item) => {
      const itemFoodId = item.foodItemId._id
        ? item.foodItemId._id.toString()
        : item.foodItemId.toString();
      return itemFoodId === foodId.toString();
    });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    // Tăng hoặc giảm số lượng
    if (action === "increase") {
      existingItem.increaseQuantity(1);
    } else {
      existingItem.decreaseQuantity(1);
    }
    // Lưu giỏ hàng
    await CartDAO.saveCart(cart);

    return res.status(200).json({
      success: true,
      message:
        action === "increase"
          ? "Tăng số lượng thành công"
          : "Giảm số lượng thành công",
      cart,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật số lượng",
      error: error.message,
    });
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    // Lấy ID của item cần xóa từ request body thay vì params
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin item cần xóa",
      });
    }

    // Lấy ID người dùng từ request (đã được xác thực qua middleware)
    const customerId = req.user._id;

    // Tìm giỏ hàng của người dùng
    let cart = await CartDAO.findCartByCustomerId(customerId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    // Xóa item khỏi giỏ hàng
    cart.deleteItem(itemId);

    // Lưu giỏ hàng sau khi cập nhật
    await CartDAO.saveCart(cart);

    // Trả về kết quả thành công
    return res.status(200).json({
      success: true,
      message: "Đã xóa sản phẩm khỏi giỏ hàng",
      cart,
    });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng",
      error: error.message,
    });
  }
};
