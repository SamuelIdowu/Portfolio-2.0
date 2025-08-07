import React from "react";
import { FaComments } from "react-icons/fa";

const HeroSection = () => (
  <section className="hero">
    <h1>
      Samuel Idowu <span className="active-beacon"></span>
    </h1>
    <h2>Innovating at the Intersection of Code and Machines</h2>
    <p>
    I’m a 21-year-old Mechatronics Engineering student from Nigeria, passionate about building solutions that combine creativity, empathy, and engineering. My journey in tech is rooted in curiosity and a relentless desire to innovate

    </p>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <a href="https://wa.me/+2348144604146" className="hero-cta">
        <FaComments /> Let’s Build Something Great

      </a>
    </div>
  </section>
);

export default HeroSection;
