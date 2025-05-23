const FoodItem = require("../models/fooditem");

class FooditemDAO {
  // Hàm lấy tất cả food item với thông tin category đầy đủ
  async getAllFoodItem() {
    try {
      // Sử dụng MongoDB để truy vấn dữ liệu và populate category
      return await FoodItem.find({}).populate("category").exec();
    } catch (error) {
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
      throw error;
    }
  }
  async addFoodItem(foodItemData) {
    try {
      // Tạo một món ăn mới
      const newFoodItem = new FoodItem(foodItemData);
      return await newFoodItem.save();
    } catch (error) {
      throw error;
    }
  }
  async editFoodItem(foodItemData, id) {
    try {
      // Cập nhật món ăn theo ID
      const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, foodItemData, {
        new: true,
      });
      return updatedFoodItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getFoodItemById(id) {
    try {
      // Tìm món ăn theo ID
      const foodItem = await FoodItem.findById(id);
      return foodItem;
    } catch (error) {
      throw error;
    }
  }
  async deleteFoodItem(id) {
    try {
      const deletedFoodItem = await FoodItem.findByIdAndDelete(id);
      return deletedFoodItem;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FooditemDAO();
