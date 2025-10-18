import { useState, useEffect } from "react";

export default function useRemBreakpoint(remBreakpoint) {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const getPxBreakpoint = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return remBreakpoint * rootFontSize;
    };

    const handleResize = () => {
      const pxBreakpoint = getPxBreakpoint();
      setIsBelow(window.innerWidth < pxBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    
    const observer = new MutationObserver(handleResize);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [remBreakpoint]);

  return isBelow;
}