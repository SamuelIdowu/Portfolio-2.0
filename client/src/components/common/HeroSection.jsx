import React from "react";
import { FaComments } from "react-icons/fa";

const HeroSection = () => (
  <section className="hero">
    <h1>
      Samuel Victor <span className="active-beacon"></span>
    </h1>
    <h2>Software Engineer & AI Specialist</h2>
    <p>
      Building innovative solutions with MERN stack, AI, and Web3 technologies.
      Passionate about creating scalable applications that solve real-world
      problems.
    </p>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <a href="https://wa.me/+2348144604146" className="hero-cta">
        <FaComments /> Get In Touch
      </a>
    </div>
  </section>
);

export default HeroSection;
