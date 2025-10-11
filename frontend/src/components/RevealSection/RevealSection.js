import React, { useEffect, useRef } from "react";
import "./RevealSection.css";

export default function RevealSection({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      el.classList.add("visible");
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  const revealClass = direction === "up" ? "reveal-up" : "reveal-down";

  return children ? React.cloneElement(children, { ref, className: `${children.props.className ?? ""} ${revealClass}` }) : null;
}
