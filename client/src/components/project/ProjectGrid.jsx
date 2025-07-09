import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects, onProjectClick }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onClick={onProjectClick}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
