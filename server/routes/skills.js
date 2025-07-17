const express = require("express");
const router = express.Router();
const { getAllSkills } = require("../controllers/skillController");

// GET /api/skills
router.get("/", getAllSkills);

module.exports = router;
