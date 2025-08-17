const Skill = require("../models/Skill");

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(400).json({ error: err.message || "Error creating skill" });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
