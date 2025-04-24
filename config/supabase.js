const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Hàm kiểm tra kết nối Supabase
async function testConnection() {
  try {
    const { error } = await supabase.from("fooditem").select("*").limit(1);
    if (error) {
      console.error("❌ Supabase connection failed:", error.message);
    } else {
      console.log("✅ Supabase connected successfully.");
    }
  } catch (err) {
    console.error("❌ Error connecting to Supabase:", err);
  }
}

// Gọi hàm kiểm tra kết nối
testConnection();

module.exports = supabase;
