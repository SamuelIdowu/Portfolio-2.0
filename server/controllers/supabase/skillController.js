const supabase = require("../../config/supabase");

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const skillData = {
      name: req.body.name,
      category: req.body.category,
      proficiency: parseInt(req.body.proficiency),
      icon: req.body.icon || null,
      is_active: req.body.isActive !== undefined ? req.body.isActive : true,
      order: req.body.order || 0
    };

    const { data, error } = await supabase
      .from('skills')
      .insert([skillData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating skill:', error);
      return res.status(400).json({ error: error.message });
    }

    // Convert back to frontend format
    const formattedSkill = formatSkillForFrontend(data);
    res.status(201).json(formattedSkill);
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error fetching skills:', error);
      return res.status(500).json({ error: error.message });
    }

    // Convert to frontend format
    const formattedSkills = data.map(formatSkillForFrontend);
    res.json(formattedSkills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      proficiency: parseInt(req.body.proficiency),
      icon: req.body.icon || null,
      is_active: req.body.isActive !== undefined ? req.body.isActive : true,
      order: req.body.order || 0
    };

    const { data, error } = await supabase
      .from('skills')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: "Skill not found" });
      }
      console.error('Supabase error updating skill:', error);
      return res.status(400).json({ error: error.message });
    }

    const formattedSkill = formatSkillForFrontend(data);
    res.json(formattedSkill);
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error deleting skill:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Helper function to format Supabase data for frontend compatibility
function formatSkillForFrontend(skill) {
  return {
    _id: skill.id, // Keep _id for frontend compatibility
    id: skill.id,
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    icon: skill.icon,
    isActive: skill.is_active,
    order: skill.order,
    createdAt: skill.created_at,
    updatedAt: skill.updated_at
  };
}
