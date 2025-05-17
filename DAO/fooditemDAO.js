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
}

module.exports = new FooditemDAO();
