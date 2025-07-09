import React from "react";
import { FaFileAlt, FaFileDownload, FaEye } from "react-icons/fa";

const CVSection = () => (
  <section className="section" id="cv">
    <h3>
      <FaFileAlt /> Download My CV
    </h3>
    <div className="cv-section">
      <div className="cv-icon">
        <FaFileDownload />
      </div>
      <h3>Download My Professional Resume</h3>
      <p>
        Get a comprehensive overview of my skills, experience, and
        qualifications
      </p>
      <div className="cv-actions">
        <a href="/samuel_victor_cv.pdf" download className="cv-btn">
          <FaFileDownload /> Download CV
        </a>
        <a
          href="/samuel_victor_cv.pdf"
          target="_blank"
          rel="noopener"
          className="cv-btn"
        >
          <FaEye /> View Online
        </a>
      </div>
    </div>
  </section>
);

export default CVSection;
