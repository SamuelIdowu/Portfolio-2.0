const express = require("express");
const router = express.Router();
const { getAllProjects } = require("../controllers/projectController");

// GET /api/projects
router.get("/", getAllProjects);

module.exports = router;
