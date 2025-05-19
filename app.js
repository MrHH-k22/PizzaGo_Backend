const express = require("express");
const database = require("./config/db");
const fooditemRoute = require("./routes/fooditem.route.js");
const authRoute = require("./routes/auth.route.js");
const categoryRoute = require("./routes/category.route.js");
const helmet = require("helmet");
const cookieParser = require("cookie-parser"); // Add this line
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;

// Add cookie parser before routes
app.use(cookieParser()); // Add this line

// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONT_END_URI, // specific origin
    credentials: true, // allow credentials
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);
app.use("/category", categoryRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
