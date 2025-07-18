import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://samuelidowu-2-0.onrender.com/api";

const initialForm = {
  name: "",
  category: "",
  proficiency: 0,
  icon: "",
};

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchSkills = () => {
    setLoading(true);
    fetch(`${API_BASE}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (skill) => {
    setForm({ ...skill });
    setEditId(skill._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this skill?")) return;
    fetch(`${API_BASE}/skills/${id}`, { method: "DELETE" }).then(() =>
      fetchSkills()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      proficiency: Number(form.proficiency),
    };
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_BASE}/skills/${editId}` : `${API_BASE}/skills`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setShowForm(false);
      fetchSkills();
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
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h2 className="text-4xl font-bold text-gray-100 mb-2">
            Skill Manager
          </h2>
          <p className="text-gray-400">
            Manage your portfolio skills with ease
          </p>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#23243a] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-2xl font-bold text-gray-100">
                  {editId ? "Edit Skill" : "Add New Skill"}
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      placeholder="Enter skill name"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleInput}
                      placeholder="e.g., Programming, Design"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Proficiency (0-100)
                    </label>
                    <input
                      name="proficiency"
                      type="number"
                      min="0"
                      max="100"
                      value={form.proficiency}
                      onChange={handleInput}
                      placeholder="85"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Icon URL or name
                    </label>
                    <input
                      name="icon"
                      value={form.icon}
                      onChange={handleInput}
                      placeholder="Icon URL or name"
                      className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-700 to-green-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {editId ? "Update Skill" : "Add Skill"}
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
                Your Skills ({skills.length})
              </h3>
              <button
                onClick={handleAdd}
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Skill
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                <span className="ml-3 text-gray-300">Loading skills...</span>
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-100 mb-2">
                  No skills yet
                </h3>
                <p className="text-gray-400 mb-4">
                  Get started by adding your first skill
                </p>
                <button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Add Skill
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="bg-gradient-to-r from-[#23243a] to-[#18192a] border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-100 mb-2">
                          {skill.name}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="bg-gray-800 px-3 py-1 rounded-full">
                            {skill.category}
                          </span>
                          <span className="bg-green-900 text-green-200 px-3 py-1 rounded-full">
                            {skill.proficiency}% Proficiency
                          </span>
                        </div>
                        {skill.icon && (
                          <p className="text-sm text-gray-500 mt-2">
                            Icon: {skill.icon}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="bg-red-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-900 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
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

export default SkillManager;
