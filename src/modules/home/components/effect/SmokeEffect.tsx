import React, { useState, useEffect } from 'react';
import './SmokeEffect.css'; // Ensure the path to the CSS is correct

const SmokeEffect: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  // Utility function to generate random color
  const getRandomColor = () => {
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#FFBB28', '#D4A5A5', '#F9E79F'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle mouse move to generate particles
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    // Create a particle element with random color and size
    const particle = {
      id: Date.now(),
      x: clientX,
      y: clientY,
      color: getRandomColor(),
      size: Math.random() * 10 + 10, // Size between 10px to 20px
    };

    // Add the particle to the list
    setParticles((prevParticles) => [...prevParticles, particle]);

    // Remove the particle after its animation ends (2 seconds)
    setTimeout(() => {
      setParticles((prevParticles) => prevParticles.filter((p) => p.id !== particle.id));
    }, 2000); // Matches the CSS animation time
  };

  useEffect(() => {
    // Add mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="smoke-effect-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="smoke-particle"
          style={{
            left: particle.x - particle.size / 2, // Offset to center the particle
            top: particle.y - particle.size / 2,  // Offset to center the particle
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SmokeEffect;
