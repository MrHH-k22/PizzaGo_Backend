const mongoose = require("mongoose");
const { Schema } = mongoose;
const FoodItem = require("./fooditem");

const pizzaSchema = new Schema({
  pizzaBase: { type: String, required: true },           
  sauce: { type: String, required: true },               
  toppings: [{ type: String, required: true }],          
  vegetables: [{ type: String }]                        
});
const Pizza = FoodItem.discriminator("Pizza", pizzaSchema);
module.exports = Pizza;