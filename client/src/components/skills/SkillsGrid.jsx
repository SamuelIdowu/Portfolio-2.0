import React, { useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaBrain,
  FaLink,
} from "react-icons/fa";

const iconMap = {
  React: <FaReact />,
  "Node.js": <FaNodeJs />,
  Python: <FaPython />,
  MongoDB: <FaDatabase />,
  AI: <FaBrain />,
  Web3: <FaLink />,
};

const SkillsGrid = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/skills`;
    console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load skills");
        setLoading(false);
      });
  }, []);

  return (
    <section className="section" id="skills">
      <h3>
        <FaReact /> Technical Skills
      </h3>
      {loading ? (
        <div>Loading skills...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill._id}>
              <div className="skill-header">
                <div className="skill-icon">
                  {iconMap[skill.name] || <FaReact />}
                </div>
                <div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-percentage">{skill.proficiency}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsGrid;
