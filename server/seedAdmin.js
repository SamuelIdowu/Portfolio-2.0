const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const MONGO_URI =
  process.env.MONGO_URI ;

const adminUser = {
  username: "admin",
  email: "admin@example.com",
  password: "admin123", // Will be hashed
  role: "admin",
};

async function seedAdmin() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const existing = await User.findOne({ username: adminUser.username });
  if (existing) {
    console.log("Admin user already exists.");
    mongoose.disconnect();
    return;
  }
  const hashed = await bcrypt.hash(adminUser.password, 10);
  await User.create({ ...adminUser, password: hashed });
  console.log("Admin user created!");
  mongoose.disconnect();
}

seedAdmin();




// https://samuelidowu-2-0.onrender.com/