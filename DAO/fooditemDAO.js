const FoodItem = require("../models/fooditem");

class FooditemDAO {
  // Hàm lấy tất cả food item với thông tin category đầy đủ
  async getAllFoodItem() {
    try {
      // Sử dụng MongoDB để truy vấn dữ liệu và populate category
      return await FoodItem.find({}).populate("category").exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Trong fooditemDAO.js
  async searchFoodItems(query) {
    try {
      // Tìm kiếm món ăn theo tên hoặc mô tả chứa chuỗi truy vấn
      return await FoodItem.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Tìm theo tên
          { description: { $regex: query, $options: "i" } }, // Tìm theo mô tả
        ],
      })
        .populate("category")
        .exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new FooditemDAO();
