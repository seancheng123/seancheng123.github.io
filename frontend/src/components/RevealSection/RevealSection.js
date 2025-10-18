import React, { useEffect, useRef, useState } from "react";
import "./RevealSection.css";

export default function RevealSection({ children, delay = 0, direction = "up", duration = 2 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeout = setTimeout(() => setIsVisible(true), delay * 1000);
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, [delay]);

  const revealClass = direction === "up" ? "reveal-up" : "reveal-down";

  const style = {
    transition: `opacity ${duration}s ease-in, transform ${duration}s ease-out`,
  };

  return children ? React.cloneElement(children, { ref, className: `${children.props.className ?? ""} ${revealClass} ${isVisible ? "visible" : ""}`, style: { ...children.props.style, ...style } }) : null;
}
