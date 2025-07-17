const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

// GET /api/projects
router.get("/", getAllProjects);

// DELETE /api/projects/:id
router.delete("/:id", deleteProject);

// PUT /api/projects/:id
router.put("/:id", updateProject);

module.exports = router;
