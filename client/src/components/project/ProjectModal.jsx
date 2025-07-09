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
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-tags">
            {tags.map((tag, i) => (
              <span className="modal-tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
          <p className="modal-description">
            {project.desc || "Project description goes here."}
          </p>
          <div className="modal-features">
            <h4>Key Features:</h4>
            <ul>
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="modal-links">
            <a href="#" className="modal-link demo">
              <FaExternalLinkAlt /> Live Demo
            </a>
            <a href="#" className="modal-link github">
              <FaGithub /> Source Code
            </a>
            <a
              href="https://wa.me/+2348144604146"
              target="_blank"
              rel="noopener"
              className="modal-link whatsapp"
            >
              <FaWhatsapp /> Discuss Project
            </a>
          </div>
        </div>
        <div className="modal-image">
          <div className="carousel">
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {demoImages.map((img, i) => (
                <div
                  className="carousel-item"
                  key={i}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn prev-btn" onClick={handlePrev}>
                <FaTimes style={{ transform: "rotate(90deg)" }} />
              </button>
              <button className="carousel-btn next-btn" onClick={handleNext}>
                <FaTimes style={{ transform: "rotate(-90deg)" }} />
              </button>
            </div>
            <div className="carousel-indicators">
              {demoImages.map((_, i) => (
                <div
                  key={i}
                  className={`carousel-indicator${
                    i === slide ? " active" : ""
                  }`}
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
