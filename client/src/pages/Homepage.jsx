import React, { useState } from "react";
import HeroSection from "../components/common/HeroSection";
import SkillsGrid from "../components/skills/SkillsGrid";
import ProjectsSection from "../components/project/ProjectsSection";
import ExperienceSection from "../components/common/ExperienceSection";
import EducationSection from "../components/common/EducationSection";
import CVSection from "../components/common/CVSection";
import ContactSection from "../components/common/ContactSection";
import ProjectModal from "../components/project/ProjectModal";
import { Helmet } from "react-helmet-async";
// import avatar from "../assets/react.svg"; // Replace with your avatar image

const API_BASE = "http://localhost:5000/api";

const Homepage = () => {
  // Modal state for project details
  const [modalProject, setModalProject] = useState(null);

  return (
    <div className="container">
      <Helmet>
        <title>Samuel Idowu | MERN, AI, Web3 Portfolio</title>
        <meta
          name="description"
          content="A clean, modern portfolio website showcasing Samuel Idowu's software development expertise in MERN stack, AI, mechatronics, and Web3 technologies."
        />
        <meta
          name="keywords"
          content="Samuel Victor, MERN, AI, Web3, Portfolio, Developer, Mechatronics"
        />
        <meta
          property="og:title"
          content="Samuel Victor | MERN, AI, Web3 Portfolio"
        />
        <meta
          property="og:description"
          content="A clean, modern portfolio website showcasing Samuel Idowu's software development expertise in MERN stack, AI, mechatronics, and Web3 technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-image.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Samuel Victor",
              "url": "https://yourdomain.com/",
              "image": "https://yourdomain.com/og-image.jpg",
              "sameAs": [
                "https://github.com/samuelvictor",
                "https://linkedin.com/in/samuelvictor"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            }
          `}
        </script>
      </Helmet>
      <HeroSection />
      <SkillsGrid />
      <ProjectsSection onProjectClick={setModalProject} />
      <ExperienceSection />
      <EducationSection />
      <CVSection />
      <ContactSection />
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default Homepage;
