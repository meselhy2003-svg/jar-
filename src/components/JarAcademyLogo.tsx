import React from 'react';

interface LogoProps {
  height?: number | string;
  className?: string;
}

const JarAcademyLogo: React.FC<LogoProps> = ({ height = 52, className = '' }) => {
  return (
    <img 
      src="/logo.png" 
      alt="JAR Academy Logo" 
      className={`jar-academy-logo-img ${className}`}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height, 
        width: 'auto', 
        display: 'block', 
        objectFit: 'contain' 
      }}
    />
  );
};

export default JarAcademyLogo;
