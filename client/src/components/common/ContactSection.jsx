import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

const CONTACTS = [
  {
    href: "https://twitter.com/samuelidowu_6",
    label: "X (Twitter)",
    icon: <FaTwitter size={32} />,
  },
  {
    href: "https://github.com/SamuelIdowu",
    label: "GitHub",
    icon: <FaGithub size={32} />,
  },
  {
    href: "https://linkedin.com/in/samueltemiloluwaidowu",
    label: "LinkedIn",
    icon: <FaLinkedin size={32} />,
  },
  {
    href: "thenasis2@gmail.com",
    label: "Email",
    icon: <FaRegEnvelope size={32} />,
  },
];

const ContactSection = () => (
  <section className="card contact-section">
    <div className="contact-title">
      <h2>Let's Connect or Collaborate</h2>
    </div>
    <div className="contact-icons">
      {CONTACTS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-icon-btn"
          aria-label={c.label}
        >
          {c.icon}
        </a>
      ))}
    </div>
  </section>
);

export default ContactSection;
