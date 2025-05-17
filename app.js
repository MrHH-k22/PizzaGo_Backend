const express = require("express");
const database = require("./config/db");
const fooditemRoute = require("./routes/fooditem.route.js");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONT_END_URI, // specific origin
    credentials: true, // allow credentials
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

// Không cần gọi connectDB() vì kết nối đã được thiết lập khi import

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
