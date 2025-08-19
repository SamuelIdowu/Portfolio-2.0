import React from "react";
import { FaComments } from "react-icons/fa";

const HeroSection = () => (
  <section className="col-span-full p-8 rounded-lg shadow-lg bg-gray-800 text-center">
    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text flex items-center justify-center gap-2">
      Samuel Idowu <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-2 shadow-lg animate-pulse"></span>
    </h1>
    <h2 className="text-2xl text-blue-300 mb-6 font-medium">Innovating at the Intersection of Code and Machines</h2>
    <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed mb-8">
    I’m a 21-year-old Mechatronics Engineering student from Nigeria, passionate about building solutions that combine creativity, empathy, and engineering. My journey in tech is rooted in curiosity and a relentless desire to innovate
    </p>
    <div className="flex justify-center">
      <a href="https://wa.me/+2348144604146" className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-xl w-1/2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105">
        <FaComments /> Let’s Build Something Great
      </a>
    </div>
  </section>
);

export default HeroSection;
