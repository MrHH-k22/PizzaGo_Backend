const express = require("express");
const database = require("./config/db");
const fooditemRoute = require("./routes/fooditem.route.js");
const authRoute = require("./routes/auth.route.js");
const categoryRoute = require("./routes/category.route.js");
const cartRoute = require("./routes/cart.route.js");
const orderRoute = require("./routes/order.route.js");
const userRoute = require("./routes/user.route.js");
const helmet = require("helmet");
const cookieParser = require("cookie-parser"); // Add this line
const orderController = require("./controllers/order.controller");
const EmailNotificationObserver = require("./observers/EmailNotificationObserver");
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONT_END_URI,
    credentials: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.use("/order", orderRoute);

app.use("/user", userRoute);

// Set up observers
const emailObserver = new EmailNotificationObserver();
orderController.registerObserver(emailObserver);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
