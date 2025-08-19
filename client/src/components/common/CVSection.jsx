import React from "react";
import { FaFileAlt, FaFileDownload, FaEye } from "react-icons/fa";

const CVSection = () => (
  <section className="col-span-1 p-8 rounded-lg shadow-lg bg-gray-800" id="cv">
    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
      <FaFileAlt className="text-blue-400" /> Download My CV
    </h3>
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-6">
        <FaFileDownload />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Download My Professional Resume</h3>
      <p className="text-gray-300 text-md leading-relaxed mb-6">
        Get a comprehensive overview of my skills, experience, and
        qualifications
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/samuel_victor_cv.pdf" download className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full text-md font-medium transition-all duration-300 hover:bg-blue-700 shadow-md">
          <FaFileDownload className="mr-2" /> Download CV
        </a>
        <a
          href="/samuel_victor_cv.pdf"
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center px-6 py-3 bg-gray-700 text-white rounded-full text-md font-medium transition-all duration-300 hover:bg-gray-600 shadow-md"
        >
          <FaEye className="mr-2" /> View Online
        </a>
      </div>
    </div>
  </section>
);

export default CVSection;
