const express = require("express");
const router = express.Router({ mergeParams: true });
const categoryController = require("../controllers/category.controller.js");

router.route("/getcategories").get(categoryController.getCategories);

module.exports = router;
