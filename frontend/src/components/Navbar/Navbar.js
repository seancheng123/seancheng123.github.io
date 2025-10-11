import "./Navbar.css";
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a className="logo underline-animate" href="/#">Sean Cheng</a>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a class="underline-animate" href="/">The Foyer</a></li>
        <li><a class="underline-animate" href="/about">Program Notes</a></li>
        <li><a class="underline-animate" href="/blog">Romantic Reveries</a></li>
        <li><a class="underline-animate" href="/archive">Limelight Letters</a></li>
        <li><a class="underline-animate" href="/archive">Repertoire</a></li>
        <li><a class="underline-animate" href="/archive">Postlude</a></li>
      </ul>
    </nav>
  );
}
