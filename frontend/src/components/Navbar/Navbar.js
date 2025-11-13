import "./NavBar.css";
import { useState, useEffect, useRef, useCallback } from 'react';

export default function NavBar({ toggleOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  
  const lastScrollYRef = useRef(0); 
  
  const handleScroll = useCallback(() => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) { 
          setShow(false);
      } 
      else {
          setShow(true);
      }
      
      lastScrollYRef.current = currentScrollY; 
      
  }, []); 

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      
      return () => window.removeEventListener("scroll", handleScroll);
      
  }, [handleScroll]);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`nav-bar ${show ? "visible" : ""}`}>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleHamburger();
          toggleOpen();
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
