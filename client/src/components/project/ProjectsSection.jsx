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
    <section className="section" id="projects">
      <h3>
        <FaRocket /> Featured Projects
      </h3>
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${selected === cat ? " active" : ""}`}
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
        <div className="projects-container">
          {filteredProjects.map((p) => (
            <div
              className="project-item"
              key={p._id}
              style={{ cursor: "pointer" }}
            >
              <div className="project-header">
                <div
                  className="project-icon"
                  style={{
                    background: gradientMap[p.category] || gradientMap.Default,
                  }}
                >
                  {iconMap[p.category] || <FaRocket />}
                </div>
                <div className="project-info">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              </div>
              <div className="project-tech">
                {(p.technologies || []).map((t) => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  className="project-action primary"
                  onClick={() => onProjectClick(p)}
                >
                  <FaRocket /> Details
                </button>
                <a
                  className="project-action whatsapp"
                  href="https://wa.me/+2348144604146"
                  target="_blank"
                  rel="noopener"
                >
                  <FaRocket /> Discuss
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
