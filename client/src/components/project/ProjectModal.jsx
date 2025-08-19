import React, { useState } from "react";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

const demoImages = [
  "https://via.placeholder.com/800x400?text=Project+1",
  "https://via.placeholder.com/800x400?text=Project+2",
  "https://via.placeholder.com/800x400?text=Project+3",
];

const ProjectModal = ({ project, onClose }) => {
  const [slide, setSlide] = useState(0);
  if (!project) return null;

  // Demo tags/features for now
  const tags = project.tech || ["React", "Node.js"];
  const features = ["Feature 1", "Feature 2", "Feature 3"];

  const handlePrev = () =>
    setSlide((slide - 1 + demoImages.length) % demoImages.length);
  const handleNext = () => setSlide((slide + 1) % demoImages.length);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-85 backdrop-blur-md z-50 flex items-center justify-center transition-opacity duration-300"
      onClick={(e) => {
        if (e.target.classList.contains("bg-opacity-85")) onClose();
      }}
    >
      <div className="bg-gray-800 rounded-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-700 transform scale-95 transition-transform duration-300 ease-out">
        <div className="p-8 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl transition-colors duration-200" onClick={onClose}>
            <FaTimes />
          </button>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            {project.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, i) => (
              <span className="bg-blue-900 text-blue-200 px-4 py-1 rounded-full text-sm font-medium" key={i}>
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.desc || "Project description goes here."}
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-white mb-3">Key Features:</h4>
            <ul className="list-disc list-inside text-gray-300 text-md pl-4">
              {features.map((f, i) => (
                <li key={i} className="mb-1">{f}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <a href="#" className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-blue-700 shadow-lg">
              <FaExternalLinkAlt className="mr-3" /> Live Demo
            </a>
            <a href="#" className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-600 shadow-lg">
              <FaGithub className="mr-3" /> Source Code
            </a>
            <a
              href="https://wa.me/+2348144604146"
              target="_blank"
              rel="noopener"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-green-700 shadow-lg"
            >
              <FaWhatsapp className="mr-3" /> Discuss Project
            </a>
          </div>
        </div>
        <div className="p-8 pt-0">
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {demoImages.map((img, i) => (
                <div
                  className="min-w-full h-full bg-cover bg-center"
                  key={i}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-200" onClick={handlePrev}>
                <FaTimes style={{ transform: "rotate(90deg)" }} />
              </button>
              <button className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-200" onClick={handleNext}>
                <FaTimes style={{ transform: "rotate(-90deg)" }} />
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {demoImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${i === slide ? "bg-blue-500" : "bg-gray-400 bg-opacity-50"}`}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
