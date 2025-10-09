import React, { useEffect, useRef } from "react";
import "./RevealSection.css";

export default function RevealSection({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const revealClass = direction === "up" ? "reveal-up" : "reveal-down";

  return children ? React.cloneElement(children, { ref, className: `${children.props.className ?? ""} ${revealClass}` }) : null;
}
