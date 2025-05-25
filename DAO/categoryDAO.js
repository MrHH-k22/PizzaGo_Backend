const Category = require("../models/category");

class CategoryDAO {
  // Hàm lấy tất cả category
  async getAllCategory() {
    try {
      // Sử dụng MongoDB để truy vấn dữ liệu
      return await Category.find({}).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getPizzaCategory() {
    try {
      return await Category.findOne({ name: "pizza" }).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new CategoryDAO();
