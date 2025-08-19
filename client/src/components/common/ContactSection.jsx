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
  <section className="col-span-1 p-8 rounded-lg shadow-lg bg-gray-800" id="contact">
    <div className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b pb-4 border-gray-700">
      <h2>Let's Connect or Collaborate</h2>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {CONTACTS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl transition-all duration-300 hover:bg-blue-600 hover:scale-110 shadow-md"
          aria-label={c.label}
        >
          {c.icon}
        </a>
      ))}
    </div>
  </section>
);

export default ContactSection;
