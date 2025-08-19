import React from "react";
import { FaGraduationCap, FaCalendar } from "react-icons/fa";

const education = [
  {
    date: "2021 - 2027",
    degree: "B.Eng In Mechatronics Engineering",
    institution: "Stanford University",
    desc: "Focused on Artificial Intelligence and Distributed Systems. Graduated with Honors.",
  },
  {
    date: "2023",
    degree: "Career Essentials in Artificial Intelligence",
    institution: "ALX",
    desc: "Professional certification in Career Essentials in Artificial Intelligence.",
  },
  {
    date: "2023",
    degree: "Career Essentials In Software Engineering",
    institution: "Linkedin",
    desc: "Proffesional Certification in Career Essentials In Software Engineering",
  },
];

const EducationSection = () => (
  <section className="col-span-1 p-8 rounded-lg shadow-lg bg-gray-800" id="education">
    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
      <FaGraduationCap className="text-blue-400" /> Education & Certifications
    </h3>
    <div className="grid grid-cols-1 gap-6">
      {education.map((ed, i) => (
        <div className="bg-gray-700 rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105" key={i}>
          <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <FaCalendar className="text-blue-300" /> {ed.date}
          </div>
          <div className="text-lg font-semibold text-white mb-1">{ed.degree}</div>
          <div className="text-md text-gray-300 mb-3">{ed.institution}</div>
          <div className="text-gray-300 text-sm leading-relaxed">{ed.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default EducationSection;
