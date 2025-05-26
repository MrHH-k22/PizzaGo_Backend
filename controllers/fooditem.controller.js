// const { getAllFoodItem } = require("../DAO/fooditemDAO.js");
const FooditemDAO = require("../DAO/fooditemDAO.js");
const CategoryDAO = require("../DAO/categoryDAO.js");
const PizzaDAO = require("../DAO/pizzaDAO.js");
const { deleteOldImage } = require("../utils/utils.js");
const ConcretePizzaBuilder = require("../patterns/builder/ConcretePizzaBuilder.js");
const PizzaDirector = require("../patterns/builder/PizzaDirector.js");

const pizzaBuilder = new ConcretePizzaBuilder();
const pizzaDirector = new PizzaDirector(pizzaBuilder);

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
    const formData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    const image = req.file ? req.file.filename : null;
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (image) {
      formData.image = image;
    }
    const pizzaCategory = await CategoryDAO.getPizzaCategory();
    if (formData.category === pizzaCategory._id.toString()) {
      const pizzaData = pizzaDirector.buildCustomPizza({
        ...formData,
        pizzaBase: req.body.pizzaBase,
        sauce: req.body.sauce,
        toppings: req.body.toppings,
        vegetables: req.body.vegetables,
      });

      console.log("Pizza Data:", pizzaData);

      await PizzaDAO.addPizza(pizzaData);
      return res.status(200).json({ message: "Pizza item added successfully" });
    } else {
      // Nếu không phải là pizza, thêm món ăn thông thường
      await FooditemDAO.addFoodItem(formData);
      return res.status(200).json({ message: "Food item added successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.editFoodItem = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const image = req.file ? req.file.filename : null; // Kiểm tra xem có file hình ảnh không
    const foodItemData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    if (image) {
      const currentFoodItem = await FooditemDAO.getFoodItemById(_id);
      if (currentFoodItem?.image) {
        deleteOldImage(currentFoodItem.image);
      }
      foodItemData.image = image;
    }
    const pizzaCategory = await CategoryDAO.getPizzaCategory();
    if (foodItemData.category === pizzaCategory._id.toString()) {
      foodItemData.pizzaBase = req.body.pizzaBase;
      foodItemData.sauce = req.body.sauce;
      foodItemData.toppings = req.body.toppings
        ? req.body.toppings.split(",")
        : [];
      foodItemData.vegetables = req.body.vegetables
        ? req.body.vegetables.split(",")
        : [];
      await PizzaDAO.editPizza(foodItemData, _id);
      return res
        .status(200)
        .json({ message: "Pizza item updated successfully" });
    } else {
      await FooditemDAO.editFoodItem(foodItemData, _id);
      return res
        .status(200)
        .json({ message: "Food item updated successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
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
