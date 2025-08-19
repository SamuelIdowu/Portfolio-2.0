import React from "react";
import { FaBriefcase, FaCalendar } from "react-icons/fa";

const experiences = [
  {
    date: "March 2025",
    role: "Freelance Fullstack Developer",
    company: "Briggs Fashion And Store",
    desc: "Built and deployed a full-stack fashion e-commerce store using Next.js and TypeScript for the frontend and a Node.js/Express backend with MongoDB as the database.",
  },
  {
    date: "February 2025",
    role: "Freelance Web Developer",
    company: "Crownin Artistry",
    desc: "Designed and developed a custom, responsive website for an artist using EJS, Node.js, Express, and MongoDB, improving website performance and load time.",
  },
  {
    date: "Jun 2025 - Present",
    role: "Solo Founder",
    company: "Contentworks",
    desc: "Architected and developed a comprehensive content creation workspace SaaS from the ground up, utilizing Next.js, TypeScript, and a Node.js backend with Supabase",
  },
];

const ExperienceSection = () => (
  <section className="col-span-1 p-8 rounded-lg shadow-lg bg-gray-800" id="experience">
    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
      <FaBriefcase className="text-blue-400" /> Professional Experience
    </h3>
    <div className="grid grid-cols-1 gap-6">
      {experiences.map((exp, i) => (
        <div className="bg-gray-700 rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105" key={i}>
          <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <FaCalendar className="text-blue-300" /> {exp.date}
          </div>
          <div className="text-lg font-semibold text-white mb-1">{exp.role}</div>
          <div className="text-md text-gray-300 mb-3">{exp.company}</div>
          <div className="text-gray-300 text-sm leading-relaxed">{exp.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
