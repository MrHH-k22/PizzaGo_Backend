const mongoose = require("mongoose");
const FoodItem = require("./models/fooditem"); // Adjust path if needed

// MongoDB connection URI - replace with your actual MongoDB connection string
const MONGODB_URI = "mongodb://localhost:27017/Pizza_Go";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Sample food items to insert
const foodItems = [
  {
    description:
      "Delicious margherita pizza with fresh tomatoes and mozzarella",
    name: 1, // Using number as per the schema definition
    price: 9.99,
  },
  {
    description: "Spicy pepperoni pizza with extra cheese",
    name: 2,
    price: 11.99,
  },
  {
    description: "Vegetarian pizza with bell peppers and mushrooms",
    name: 3,
    price: 10.99,
  },
  {
    description: "Hawaiian pizza with ham and pineapple",
    name: 4,
    price: 12.99,
  },
];

// Function to insert food items
async function insertFoodItems() {
  try {
    // Clear existing records (optional)
    await FoodItem.deleteMany({});
    console.log("Cleared existing food items");

    // Insert new records
    const insertedItems = await FoodItem.insertMany(foodItems);
    console.log(`Successfully inserted ${insertedItems.length} food items`);

    // Log the inserted items
    console.log("Inserted food items:", JSON.stringify(insertedItems, null, 2));
  } catch (error) {
    console.error("Error inserting food items:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Execute the function
insertFoodItems();
