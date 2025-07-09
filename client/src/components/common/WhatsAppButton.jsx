import React from "react";
import { getWhatsAppLink } from "../../utils/whatsappUtils";

const DEFAULT_PHONE = "2348012345678"; // Replace with your WhatsApp number (country code, no + or dashes)
const DEFAULT_MESSAGE = "Hello Samuel! I'd like to get in touch with you.";

const WhatsAppButton = ({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
  floating = false,
  label = "Contact Me",
}) => {
  const link = getWhatsAppLink(phone, message);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={
        floating
          ? "fixed bottom-6 right-6 bg-blue-700 text-white rounded-full shadow-lg p-3 flex items-center z-50 hover:bg-blue-600 transition"
          : "inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      }
      title="Contact me on WhatsApp"
    >
      {label}
    </a>
  );
};

export default WhatsAppButton;
