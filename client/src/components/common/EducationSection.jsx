import React from "react";
import { FaGraduationCap, FaCalendar } from "react-icons/fa";

const education = [
  {
    date: "2014 - 2018",
    degree: "BSc in Computer Science",
    institution: "Stanford University",
    desc: "Focused on Artificial Intelligence and Distributed Systems. Graduated with Honors.",
  },
  {
    date: "2020",
    degree: "AWS Certified Solutions Architect",
    institution: "Amazon Web Services",
    desc: "Professional certification in cloud architecture and distributed system design.",
  },
  {
    date: "2021",
    degree: "TensorFlow Developer Certificate",
    institution: "Google",
    desc: "Certified in building and training machine learning models using TensorFlow.",
  },
];

const EducationSection = () => (
  <section className="section" id="education">
    <h3>
      <FaGraduationCap /> Education & Certifications
    </h3>
    <div className="education-grid">
      {education.map((ed, i) => (
        <div className="education-item" key={i}>
          <div className="education-date">
            <FaCalendar /> {ed.date}
          </div>
          <div className="education-degree">{ed.degree}</div>
          <div className="education-institution">{ed.institution}</div>
          <div className="education-description">{ed.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default EducationSection;
