const express = require("express");
const fooditemRoute = require("./routes/fooditem.route.js");
const helmet = require("helmet");

const app = express();
const port = 3000;

// Cấu hình CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"], // thêm nguồn font được phép
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // nếu bạn dùng Google Fonts
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"], // nếu bạn dùng ảnh inline
      connectSrc: ["'self'", "https://your-supabase-url.supabase.co"], // Supabase API
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fooditem", fooditemRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
