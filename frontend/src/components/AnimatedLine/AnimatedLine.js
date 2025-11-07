import React, { useRef, useEffect, useState } from 'react';
import './AnimatedLine.css';

export default function AnimatedLine ({ delay = 1, duration = 1, color = "var(--color-line)", thick = 0.05 }) {
  const lineRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
					setTimeout(() => {
						setInView(true);
					}, delay * 1000);
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="animated-line-container" ref={lineRef}
      style={{
        height: `${thick}rem`
      }}>
      <div 
        className={`animated-line ${inView ? 'line-visible' : ''}`}
        style={{
          animationDuration: `${duration}s`,
          backgroundColor: `${color}`
        }}
      />
    </div>
  );
};
