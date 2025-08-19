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
    <section className="col-span-1 p-8 rounded-lg shadow-lg bg-gray-800" id="skills">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
        <FaReact className="text-blue-400" /> Technical Skills
      </h3>
      {loading ? (
        <div>Loading skills...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div className="bg-gray-700 rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105" key={skill._id}>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                  {iconMap[skill.name] || <FaReact />}
                </div>
                <div className="text-lg font-semibold text-white">{skill.name}</div>
              </div>
              <div className="text-sm text-gray-300 text-right">{skill.proficiency}%</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsGrid;
