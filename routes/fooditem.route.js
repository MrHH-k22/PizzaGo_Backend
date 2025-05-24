const express = require("express");
const router = express.Router({ mergeParams: true });
const fooditemController = require("../controllers/fooditem.controller.js");
const upload = require("../config/multer.js");
router.route("/getfooditem").get(fooditemController.getFoodItem);
router.route("/search").get(fooditemController.searchFoodItems);
router.route("/addFoodItem")
    .post(
        upload.single("image"),
        fooditemController.addFoodItem
    );
router.route("/editFoodItem").patch(
    upload.single("image"),
    fooditemController.editFoodItem
);
router.route("/deleteFoodItem").delete(fooditemController.deleteFoodItem);
module.exports = router;
