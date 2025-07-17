const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'language', 'framework', 'tool', 'database'
  proficiency: { type: Number, min: 1, max: 100, required: true },
  icon: String, // Icon name or URL
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model("Skill", skillSchema);
