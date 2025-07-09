import React from "react";
import { FaBriefcase, FaCalendar } from "react-icons/fa";

const experiences = [
  {
    date: "Jan 2022 - Present",
    role: "Lead Fullstack Developer",
    company: "TechInnovate Solutions",
    desc: "Led a team of developers in building scalable web applications using MERN stack. Implemented CI/CD pipelines and optimized application performance.",
  },
  {
    date: "Mar 2020 - Dec 2021",
    role: "AI Engineer",
    company: "DataMind Analytics",
    desc: "Developed machine learning models for predictive analytics. Built and deployed NLP solutions for text classification and sentiment analysis.",
  },
  {
    date: "Jun 2018 - Feb 2020",
    role: "Web3 Developer",
    company: "BlockTech Innovations",
    desc: "Developed smart contracts and decentralized applications on Ethereum. Created tokenomics models and implemented blockchain solutions.",
  },
];

const ExperienceSection = () => (
  <section className="section" id="experience">
    <h3>
      <FaBriefcase /> Professional Experience
    </h3>
    <div className="experience-grid">
      {experiences.map((exp, i) => (
        <div className="experience-item" key={i}>
          <div className="experience-date">
            <FaCalendar /> {exp.date}
          </div>
          <div className="experience-role">{exp.role}</div>
          <div className="experience-company">{exp.company}</div>
          <div className="experience-description">{exp.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
