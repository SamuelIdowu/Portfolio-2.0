const express = require("express");
const router = express.Router();
const {
  getAllSkills,
  deleteSkill,
  updateSkill,
} = require("../controllers/skillController");

// GET /api/skills
router.get("/", getAllSkills);

// DELETE /api/skills/:id
router.delete("/:id", deleteSkill);

// PUT /api/skills/:id
router.put("/:id", updateSkill);

module.exports = router;
