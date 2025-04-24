const { getAllFoodItem } = require("../DAO/fooditemDAO.js");

module.exports.getFoodItem = async (req, res, next) => {
  try {
    const foodItems = await getAllFoodItem();
    if (foodItems && foodItems.length > 0) {
      return res.status(200).json(foodItems);
    }
    return res.status(404).json({ message: "Không tìm thấy món ăn nào" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
