import React from "react";

interface RRProLogoProps {
  className?: string;
  theme?: "light" | "dark";
}

export const RRProLogo: React.FC<RRProLogoProps> = ({ className = "h-10 w-10", theme = "light" }) => {
  const codeColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rrpro-react-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0033cc" />
          <stop offset="50%" stop-color="#0066ff" />
          <stop offset="100%" stop-color="#00c0ff" />
        </linearGradient>
      </defs>

      <g transform="skewX(-24) translate(65, 30)">
        {/* LEFT R */}
        <path
          d="M 40,85 L 140,85 C 185,85 215,115 215,155 C 215,195 185,225 140,225 L 40,225 L 40,180 L 130,180 C 145,180 155,170 155,155 C 155,140 145,130 130,130 L 40,130 Z"
          fill="url(#rrpro-react-gradient)"
        />
        
        <path d="M 40,240 L 125,240 L 40,380 L -45,380 Z" fill="url(#rrpro-react-gradient)" />
        <path d="M 140,240 L 225,240 L 140,380 L 55,380 Z" fill="url(#rrpro-react-gradient)" />

        {/* RIGHT R */}
        <path
          d="M 255,85 L 355,85 C 400,85 430,115 430,155 C 430,195 400,225 355,225 L 255,225 L 255,180 L 345,180 C 360,180 370,170 370,155 C 370,140 360,130 345,130 L 255,130 Z"
          fill="url(#rrpro-react-gradient)"
        />
        
        <path d="M 255,240 L 340,240 L 255,380 L 170,380 Z" fill="url(#rrpro-react-gradient)" />
        <path d="M 355,240 L 440,240 L 355,380 L 270,380 Z" fill="url(#rrpro-react-gradient)" />

        {/* EMBEDDED CODE SYMBOL */}
        <g transform="translate(42, -5)">
          <path
            d="M 282,142 L 265,160 L 282,178"
            fill="none"
            stroke={codeColor}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M 299,132 L 285,188"
            fill="none"
            stroke={codeColor}
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          
          <path
            d="M 302,142 L 319,160 L 302,178"
            fill="none"
            stroke={codeColor}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
