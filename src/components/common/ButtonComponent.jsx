import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ 
  text, 
  icon: Icon, 
  to, 
  href, 
  className = "", 
  onClick 
}) => {
  const baseClasses = "px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition inline-flex items-center gap-2";
  const combinedClasses = `${baseClasses} ${className}`;

  // If it's an internal navigation link
  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {Icon && <Icon size={20} />}
        {text}
      </Link>
    );
  }

  // If it's an external link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        onClick={onClick}
      >
        {Icon && <Icon size={20} />}
        {text}
      </a>
    );
  }

  // If it's a regular button
  return (
    <button className={combinedClasses} onClick={onClick}>
      {Icon && <Icon size={20} />}
      {text}
    </button>
  );
};

export default ButtonComponent;
