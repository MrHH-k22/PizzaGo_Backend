const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodItemSchema = new Schema(
  {
    description: { type: String, required: true },
    name: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
