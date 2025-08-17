const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const supabase = require("./config/supabase");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
// app.use('/api/auth', require('./routes/auth'));

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test Supabase connection
(async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection error:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message);
    console.log('⚠️  Please check your Supabase environment variables');
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
