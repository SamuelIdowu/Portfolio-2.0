const express = require("express");
const router = express.Router();
const {
  createSkill,
  getAllSkills,
  deleteSkill,
  updateSkill,
} = require("../controllers/supabase/skillController");

// POST /api/skills
router.post("/", createSkill);

// GET /api/skills
router.get("/", getAllSkills);

// DELETE /api/skills/:id
router.delete("/:id", deleteSkill);

// PUT /api/skills/:id
router.put("/:id", updateSkill);

module.exports = router;
