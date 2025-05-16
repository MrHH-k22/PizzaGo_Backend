// const supabase = require("../config/supabase");
const FoodItem = require("../models/fooditem");

class FooditemDAO {
  // Hàm lấy tất cả food item
  async getAllFoodItem() {
    try {
      // Sử dụng MongoDB để truy vấn dữ liệu
      return await FoodItem.find({}).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new FooditemDAO();
