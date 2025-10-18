import "./Navbar.css";
import { useState } from 'react';
import MusicalLink from "../../components/MusicalLink/MusicalLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <MusicalLink className="logo animate-link" href="/">sean cheng</MusicalLink>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><MusicalLink className="animate-link" href="/">The Foyer</MusicalLink></li>
        <li><MusicalLink className="animate-link" href="/notes">Program Notes</MusicalLink></li>
        <li><MusicalLink className="animate-link" href="/reveries">Romantic Reveries</MusicalLink></li>
        <li><MusicalLink className="animate-link" href="/letters">Limelight Letters</MusicalLink></li>
        <li><MusicalLink className="animate-link" href="/repertoire">Repertoire</MusicalLink></li>
        <li><MusicalLink className="animate-link" href="/postlude">Postlude</MusicalLink></li>
      </ul>
    </nav>
  );
}
