const CategoryDAO = require("../DAO/categoryDAO.js");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryDAO.getAllCategory();
    if (categories && categories.length > 0) {
      return res.status(200).json(categories);
    }
    return res.status(404).json({ message: "Cannot find any category" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
