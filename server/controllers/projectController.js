const Project = require("../models/Project");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(400).json({ error: err.message || "Error creating project" });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
