const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
} = require("../controllers/supabase/projectController");

// POST /api/projects
router.post("/", createProject);

// GET /api/projects
router.get("/", getAllProjects);

// DELETE /api/projects/:id
router.delete("/:id", deleteProject);

// PUT /api/projects/:id
router.put("/:id", updateProject);

module.exports = router;
