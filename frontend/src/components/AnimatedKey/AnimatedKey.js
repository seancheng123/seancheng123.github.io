import React, { useEffect, useState } from "react";
import "./AnimatedKey.css";

export default function AnimatedKey({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={`animated-key ${visible ? "visible" : ""}`}
    >
      {children}
    </div>
  );
}
