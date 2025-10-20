import "./Navbar.css";
import { useState, useEffect } from 'react';
import MusicalLink from "../../components/MusicalLink/MusicalLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${show ? "visible" : ""}`}>
      <MusicalLink className="logo underline-animate" href="/">sean cheng</MusicalLink>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><MusicalLink className="underline-animate" href="/">The Foyer</MusicalLink></li>
        <li><MusicalLink className="underline-animate" href="/notes">Program Notes</MusicalLink></li>
        <li><MusicalLink className="underline-animate" href="/reveries">Romantic Reveries</MusicalLink></li>
        <li><MusicalLink className="underline-animate" href="/letters">Limelight Letters</MusicalLink></li>
        <li><MusicalLink className="underline-animate" href="/repertoire">Repertoire</MusicalLink></li>
        <li><MusicalLink className="underline-animate" href="/postlude">Postlude</MusicalLink></li>
      </ul>
    </nav>
  );
}
