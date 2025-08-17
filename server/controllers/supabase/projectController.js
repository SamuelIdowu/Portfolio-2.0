const supabase = require("../../config/supabase");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      technologies: req.body.technologies || [],
      images: req.body.images || [],
      live_url: req.body.liveUrl,
      github_url: req.body.githubUrl,
      features: req.body.features || [],
      is_featured: req.body.isFeatured || false,
      is_active: req.body.isActive !== undefined ? req.body.isActive : true
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating project:', error);
      return res.status(400).json({ error: error.message });
    }

    // Convert back to frontend format
    const formattedProject = formatProjectForFrontend(data);
    res.status(201).json(formattedProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching projects:', error);
      return res.status(500).json({ error: error.message });
    }

    // Convert to frontend format
    const formattedProjects = data.map(formatProjectForFrontend);
    res.json(formattedProjects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      technologies: req.body.technologies || [],
      images: req.body.images || [],
      live_url: req.body.liveUrl,
      github_url: req.body.githubUrl,
      features: req.body.features || [],
      is_featured: req.body.isFeatured || false,
      is_active: req.body.isActive !== undefined ? req.body.isActive : true
    };

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: "Project not found" });
      }
      console.error('Supabase error updating project:', error);
      return res.status(400).json({ error: error.message });
    }

    const formattedProject = formatProjectForFrontend(data);
    res.json(formattedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error deleting project:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: "Server error" });
  }
};

// Helper function to format Supabase data for frontend compatibility
function formatProjectForFrontend(project) {
  return {
    _id: project.id, // Keep _id for frontend compatibility
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category,
    technologies: project.technologies || [],
    images: project.images || [],
    liveUrl: project.live_url,
    githubUrl: project.github_url,
    features: project.features || [],
    isFeatured: project.is_featured,
    isActive: project.is_active,
    createdAt: project.created_at,
    updatedAt: project.updated_at
  };
}
