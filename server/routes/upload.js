const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const path = require("path");

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Return the relative URL to the uploaded image
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
