import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

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
    <div className="min-h-screen bg-gradient-to-br from-[#18192a] to-[#23243a] text-gray-100 py-10 px-2">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <Link to="/admin" className="text-blue-400 hover:text-blue-300 underline mb-8 inline-block">
          &larr; Back to Dashboard
        </Link>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-2">Skill Manager</h2>
          <p className="text-gray-400">Manage your portfolio skills</p>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#23243a] rounded-2xl border border-gray-700 p-8 mb-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleInput}
                  placeholder="Category"
                  className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency (0-100)</label>
                <input
                  name="proficiency"
                  type="number"
                  min="0"
                  max="100"
                  value={form.proficiency}
                  onChange={handleInput}
                  placeholder="Proficiency (0-100)"
                  className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon URL or name</label>
                <input
                  name="icon"
                  value={form.icon}
                  onChange={handleInput}
                  placeholder="Icon URL or name"
                  className="w-full px-4 py-3 border border-gray-700 bg-[#18192a] text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {editId ? "Update" : "Add"} Skill
              </button>
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : skills.length === 0 ? (
          <div className="text-center py-8">No skills found.</div>
        ) : (
          <ul className="space-y-6">
            {skills.map((skill) => (
              <li
                key={skill._id}
                className="bg-[#23243a] rounded-xl border border-gray-700 p-6 flex flex-col md:flex-row justify-between items-center shadow-sm"
              >
                <span className="font-semibold text-lg text-gray-100 mb-2 md:mb-0">
                  {skill.name} <span className="text-xs text-gray-400">({skill.proficiency}%)</span>
                </span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() => handleEdit(skill)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() => handleDelete(skill._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          className="mt-10 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
          onClick={handleAdd}
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillManager;
