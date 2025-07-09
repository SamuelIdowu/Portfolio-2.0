const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // 'web3', 'ai', 'fullstack', 'iot', 'mobile'
  technologies: [String],
  images: [String], // 1-3 image URLs
  liveUrl: String,
  githubUrl: String,
  features: [String],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
