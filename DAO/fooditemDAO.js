const supabase = require("../config/supabase");

// Định nghĩa class FoodItem
class FoodItem {
  constructor({ id, name, description, price }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

class FooditemDAO {
  // Hàm lấy tất cả food item
  async getAllFoodItem() {
    const { data, error } = await supabase
      .from("fooditem")
      .select("id, name, description, price");

    if (error) {
      throw error;
    }

    // Chuyển đổi dữ liệu thành mảng các đối tượng FoodItem
    return data.map((item) => new FoodItem(item));
  }
}

module.exports = new FooditemDAO();
