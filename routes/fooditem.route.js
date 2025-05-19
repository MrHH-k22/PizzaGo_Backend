const express = require("express");
const router = express.Router({ mergeParams: true });
const fooditemController = require("../controllers/fooditem.controller.js");

router.route("/getfooditem").get(fooditemController.getFoodItem);
router.route("/search").get(fooditemController.searchFoodItems);

module.exports = router;
