// components/ui/CurvedTiltLink.tsx
import React, { useState } from "react";
import { Link, LinkProps } from "react-router-dom";

interface CurvedTiltLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CurvedTiltLink: React.FC<CurvedTiltLinkProps> = ({ to, children, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center px-6 py-2 text-sm font-medium text-gray-900 transition-all duration-300 ease-in-out rounded-2xl shadow-md ${className}`}
      style={{
        color: isHovered ? "#fff" : "",
        background: isHovered ? "linear-gradient(to right, #ef4444, #b91c1c)" : "",
        transform: isHovered
          ? "perspective(800px) rotateY(-12deg) scale(1.05)"
          : "perspective(800px) rotateY(0deg) scale(1)",
        transformStyle: "preserve-3d"
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CurvedTiltLink;
