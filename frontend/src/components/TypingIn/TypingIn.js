import React, { useEffect, useRef, useState } from 'react';
import './TypingIn.css';

export default function TypingIn({ children, speed = 50 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fullText = typeof children === 'string' ? children : children?.toString();
    let index = 0;

    setDisplayedText(fullText.charAt(0));

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, children, speed]);

  return (
    <span ref={ref} className="typing-in">
      {displayedText}
    </span>
  );
}
