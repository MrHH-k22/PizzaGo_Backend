const express = require("express");
const connectDB = require("./config/db");
const fooditemRoute = require("./routes/fooditem.route.js");
const authRoute = require("./routes/auth.route.js");
const helmet = require("helmet");
const cors = require("cors"); // Add this line to import cors

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS - add this before your routes
app.use(
  cors({
    origin: process.env.FRONT_END_URI || "http://localhost:5173",
    credentials: true,
  })
);

// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
