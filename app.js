const express = require("express");
const connectDB = require("./config/db");
const fooditemRoute = require("./routes/fooditem.route.js");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
