import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://samuelidowu-2-0.onrender.com/api";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await fetch(`${API_BASE}/projects`);
        const skillsRes = await fetch(`${API_BASE}/skills`);

        if (!projectsRes.ok || !skillsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const projects = await projectsRes.json();
        const skills = await skillsRes.json();

        setProjects(projects);
        setSkills(skills);
        setProjectCount(projects.length);
        setSkillCount(skills.length);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        setProjectCount(projectCount - 1);
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      alert("Error deleting project.");
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills(skills.filter((s) => s._id !== id));
        setSkillCount(skillCount - 1);
      } else {
        alert("Failed to delete skill.");
      }
    } catch (err) {
      alert("Error deleting skill.");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setShowSkillModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18192a] to-[#23243a] text-gray-100 py-10 px-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Manage your portfolio content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-12 text-center items-center ">
          <div
            className="bg-[#23243a] rounded-2xl shadow-sm border border-gray-700 p-8 transition-all hover:shadow-md cursor-pointer hover:border-blue-500 group mb-4"
            onClick={() => navigate("/admin/projects")}
          >
            <div className=" flex items-center">
              <div className="p-4 bg-blue-900 rounded-lg mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Total Projects
                </p>
                <p className="text-3xl font-bold text-gray-100 mt-2">
                  {loading ? (
                    <div className="h-7 w-14 bg-gray-700 rounded animate-pulse"></div>
                  ) : error ? (
                    <span className="text-red-400 text-sm">Error</span>
                  ) : (
                    projectCount
                  )}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-[#23243a] rounded-2xl shadow-sm border border-gray-700 p-8 transition-all hover:shadow-md cursor-pointer hover:border-green-500 group mb-4"
            onClick={() => navigate("/admin/skills")}
          >
            <div className="flex items-center">
              <div className="p-4 bg-green-900 rounded-lg mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Total Skills
                </p>
                <p className="text-3xl font-bold text-gray-100 mt-2">
                  {loading ? (
                    <div className="h-7 w-14 bg-gray-700 rounded animate-pulse"></div>
                  ) : error ? (
                    <span className="text-red-400 text-sm">Error</span>
                  ) : (
                    skillCount
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#23243a] rounded-2xl shadow-sm border border-gray-700 p-8 transition-all hover:shadow-md mb-4">
            <div className="flex items-center">
              <div className="p-4 bg-purple-900 rounded-lg mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-gray-100 mt-2">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-[#23243a] rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Category: {project.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Technologies: {project.technologies?.join(", ")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline mr-2"
                    >
                      Live
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 underline"
                    >
                      GitHub
                    </a>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Details Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Skill Details</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-[#23243a] rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-gray-400 mb-2">
                    Category: {skill.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Proficiency: {skill.proficiency}%
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Icon: {skill.icon}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Active: {skill.isActive ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Order: {skill.order}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-[#23243a] rounded-2xl shadow-sm border border-gray-700 overflow-hidden mt-8">
          <div className="px-8 py-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100">
              Recent Activity
            </h2>
          </div>
          <div className="p-8">
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-400 mb-2">⚠️ Data loading failed</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors text-gray-100 mt-4"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mb-6" />
                <h3 className="text-lg font-medium text-gray-100 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-400 max-w-md mb-2">
                  The activity feed will show recent changes and updates to your
                  portfolio content.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Project Edit Modal */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#23243a] p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const updated = {
                  title: form.title.value,
                  description: form.description.value,
                  category: form.category.value,
                  technologies: form.technologies.value
                    .split(",")
                    .map((t) => t.trim()),
                  liveUrl: form.liveUrl.value,
                  githubUrl: form.githubUrl.value,
                  features: form.features.value.split(",").map((f) => f.trim()),
                  isFeatured: form.isFeatured.checked,
                  isActive: form.isActive.checked,
                };
                try {
                  const res = await fetch(
                    `${API_BASE}/projects/${editingProject._id}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(updated),
                    }
                  );
                  if (res.ok) {
                    const updatedProject = await res.json();
                    setProjects(
                      projects.map((p) =>
                        p._id === updatedProject._id ? updatedProject : p
                      )
                    );
                    setShowProjectModal(false);
                    setEditingProject(null);
                  } else {
                    alert("Failed to update project.");
                  }
                } catch (err) {
                  alert("Error updating project.");
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  defaultValue={editingProject.title}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProject.description}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editingProject.category}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="web3">Web3</option>
                  <option value="ai">AI</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="iot">IoT</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  name="technologies"
                  defaultValue={editingProject.technologies?.join(", ")}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Live URL
                </label>
                <input
                  name="liveUrl"
                  defaultValue={editingProject.liveUrl}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  GitHub URL
                </label>
                <input
                  name="githubUrl"
                  defaultValue={editingProject.githubUrl}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Features (comma-separated)
                </label>
                <input
                  name="features"
                  defaultValue={editingProject.features?.join(", ")}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4 flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingProject.isFeatured}
                    className="mr-2"
                  />
                  Featured
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingProject.isActive}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Edit Modal */}
      {showSkillModal && editingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#23243a] p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Skill</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const updated = {
                  name: form.name.value,
                  category: form.category.value,
                  proficiency: parseInt(form.proficiency.value),
                  icon: form.icon.value,
                  isActive: form.isActive.checked,
                  order: parseInt(form.order.value),
                };
                try {
                  const res = await fetch(
                    `${API_BASE}/skills/${editingSkill._id}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(updated),
                    }
                  );
                  if (res.ok) {
                    const updatedSkill = await res.json();
                    setSkills(
                      skills.map((s) =>
                        s._id === updatedSkill._id ? updatedSkill : s
                      )
                    );
                    setShowSkillModal(false);
                    setEditingSkill(null);
                  } else {
                    alert("Failed to update skill.");
                  }
                } catch (err) {
                  alert("Error updating skill.");
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  defaultValue={editingSkill.name}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editingSkill.category}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="language">Language</option>
                  <option value="framework">Framework</option>
                  <option value="tool">Tool</option>
                  <option value="database">Database</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Proficiency (%)
                </label>
                <input
                  type="number"
                  name="proficiency"
                  defaultValue={editingSkill.proficiency}
                  min="1"
                  max="100"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Icon</label>
                <input
                  name="icon"
                  defaultValue={editingSkill.icon}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingSkill.order}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingSkill.isActive}
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
