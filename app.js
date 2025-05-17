const express = require("express");
const connectDB = require("./config/db");
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

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
