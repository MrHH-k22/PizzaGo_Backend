// const { getAllFoodItem } = require("../DAO/fooditemDAO.js");
const FooditemDAO = require("../DAO/fooditemDAO.js");

module.exports.getFoodItem = async (req, res, next) => {
  try {
    const foodItems = await FooditemDAO.getAllFoodItem();
    // const foodItems = await CategoryDAO.getAllCategory();
    if (foodItems && foodItems.length > 0) {
      return res.status(200).json(foodItems);
    }
    return res.status(404).json({ message: "Cannot find any food" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.searchFoodItems = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const foodItems = await FooditemDAO.searchFoodItems(query);

    if (foodItems && foodItems.length > 0) {
      return res.status(200).json(foodItems);
    }
    return res.status(200).json([]); // Trả về mảng rỗng nếu không tìm thấy
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
