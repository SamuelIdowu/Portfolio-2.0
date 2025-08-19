import React, { useState, useEffect } from "react";
import {
  FaRocket,
  FaBrain,
  FaLink,
  FaSeedling,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaReact,
} from "react-icons/fa";

const categories = [
  "All Projects",
  "Web3/Blockchain",
  "AI/Machine Learning",
  "Full-Stack",
  "IoT/Hardware",
];

const iconMap = {
  React: <FaReact />,
  "Node.js": <FaNodeJs />,
  Python: <FaPython />,
  MongoDB: <FaDatabase />,
  AI: <FaBrain />,
  Web3: <FaLink />,
  Blockchain: <FaLink />,
  IoT: <FaSeedling />,
};

const gradientMap = {
  Blockchain: "linear-gradient(135deg, #4CAF50, #45a049)",
  AI: "linear-gradient(135deg, #2196F3, #1976D2)",
  IoT: "linear-gradient(135deg, #FF9800, #F57C00)",
  Default: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
};

const ProjectsSection = ({ onProjectClick }) => {
  const [selected, setSelected] = useState(categories[0]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load projects");
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    selected === "All Projects"
      ? projects
      : projects.filter((p) => p.category === selected);

  return (
    <section className="lg:col-span-2 p-8 rounded-lg shadow-lg bg-gray-800" id="projects">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
        <FaRocket className="text-blue-400" /> Featured Projects
      </h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selected === cat ? "bg-blue-600 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading projects...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              className="bg-gray-700 rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 flex flex-col"
              key={p._id}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0"
                  style={{
                    background: gradientMap[p.category] || gradientMap.Default,
                  }}
                >
                  {iconMap[p.category] || <FaRocket />}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-1">{p.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {(p.technologies || []).map((t) => (
                  <span className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-xs font-medium" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <button
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-700 shadow-md"
                  onClick={() => onProjectClick(p)}
                >
                  <FaRocket className="mr-2" /> Details
                </button>
                <a
                  className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-green-700 shadow-md"
                  href="https://wa.me/+2348144604146"
                  target="_blank"
                  rel="noopener"
                >
                  <FaRocket className="mr-2" /> Discuss
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
