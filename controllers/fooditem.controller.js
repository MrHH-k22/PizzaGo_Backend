// const { getAllFoodItem } = require("../DAO/fooditemDAO.js");
const FooditemDAO = require("../DAO/fooditemDAO.js");
const { deleteOldImage } = require("../utils/utils.js");
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
module.exports.addFoodItem = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.filename;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foodItemData = {
      name,
      description,
      price,
      image,
      category,
    };
    await FooditemDAO.addFoodItem(foodItemData);
    return res.status(200).json({ message: "Food item added successfully" });
    // console.log("foodItemData", foodItemData);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.editFoodItem = async (req, res, next) => {
  try {
    const { _id, name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null; // Kiểm tra xem có file hình ảnh không
    const foodItemData = {
      name,
      description,
      price,
      category,
    };
    if (image) {
      const currentFoodItem = await FooditemDAO.getFoodItemById(_id);
      if (currentFoodItem?.image) {
        deleteOldImage(currentFoodItem.image);
      }
      foodItemData.image = image;
    }
    await FooditemDAO.editFoodItem(foodItemData, _id);
    return res.status(200).json({ message: "Food item updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports.deleteFoodItem = async (req, res, next) => {
  try {
    const _id = req.body.itemId;
    if (!_id) {
      return res.status(400).json({ message: "Food item ID is required" });
    }
    const currentFoodItem = await FooditemDAO.getFoodItemById(_id);
    if (currentFoodItem?.image) {
      deleteOldImage(currentFoodItem.image);
    }
    await FooditemDAO.deleteFoodItem(_id);
    return res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};