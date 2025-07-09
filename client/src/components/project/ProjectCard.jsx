import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card-modern">
      <div className="project-card-content">
        <h3 className="project-title">{project.title}</h3>
        <div className="project-tech-list">
          {project.technologies &&
            project.technologies.map((tech, idx) => (
              <span key={idx} className="project-tech-pill">
                {tech}
              </span>
            ))}
        </div>
        <p className="project-desc">{project.description}</p>
        <button className="project-view-btn" onClick={() => onClick(project)}>
          View Project{" "}
          <span className="arrow-btn">
            <FaArrowRight />
          </span>
        </button>
      </div>
      {project.images && project.images.length > 0 && (
        <div className="project-browser-mockup">
          <img
            src={project.images[0]}
            alt={project.title + " screenshot"}
            className="project-img"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
