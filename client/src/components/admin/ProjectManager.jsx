import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

const initialForm = {
  title: "",
  description: "",
  category: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
  images: [],
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, images: [data.url] }));
    }
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setForm({
      ...project,
      technologies: project.technologies ? project.technologies.join(", ") : "",
      images: project.images || [],
    });
    setEditId(project._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;
    fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" }).then(() =>
      fetchProjects()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()),
      images: form.images,
    };
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_BASE}/projects/${editId}`
      : `${API_BASE}/projects`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setShowForm(false);
      fetchProjects();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18192a] to-[#23243a]">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-400 hover:text-blue-200 transition-colors duration-200 mb-6 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h2 className="text-4xl font-bold text-gray-100 mb-2">Project Manager</h2>
          <p className="text-gray-400">Manage your portfolio projects with ease</p>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#23243a] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-2xl font-bold text-gray-100">
                  {editId ? "Edit Project" : "Add New Project"}
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    placeholder="Enter project title"
                    className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                    placeholder="Describe your project"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleInput}
                      placeholder="e.g., Web Development"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Technologies
                    </label>
                    <input
                      name="technologies"
                      value={form.technologies}
                      onChange={handleInput}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Live URL
                    </label>
                    <input
                      name="liveUrl"
                      value={form.liveUrl}
                      onChange={handleInput}
                      placeholder="https://your-project.com"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      name="githubUrl"
                      value={form.githubUrl}
                      onChange={handleInput}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-200 hover:file:bg-blue-800"
                  />
                  {form.images && form.images.length > 0 && (
                    <div className="mt-4">
                      <img
                        src={form.images[0]}
                        alt="Preview"
                        className="h-32 w-48 object-cover rounded-lg border-2 border-gray-700 shadow-sm"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-950 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? "Update Project" : "Add Project"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-[#23243a] rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-[#23243a] to-[#18192a]">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-100">
                Your Projects ({projects.length})
              </h3>
              <button
                onClick={handleAdd}
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Project
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                <span className="ml-3 text-gray-300">Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-100 mb-2">No projects yet</h3>
                <p className="text-gray-400 mb-4">Get started by creating your first project</p>
                <button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-950 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-gradient-to-r from-[#23243a] to-[#18192a] border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-100 mb-2">
                          {project.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies && project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-900 text-blue-200 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span className="bg-gray-800 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-200 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-200 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(project)}
                          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="bg-red-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
