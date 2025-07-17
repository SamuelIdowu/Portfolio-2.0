import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://samuelidowu-2-0.onrender.com/api";

const AdminDashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18192a] to-[#23243a] text-gray-100 py-10 px-2" >
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
    </div>
  );
};

export default AdminDashboard;
