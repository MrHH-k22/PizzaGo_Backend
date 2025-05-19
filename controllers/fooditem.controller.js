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
