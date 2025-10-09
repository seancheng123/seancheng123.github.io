import "./Navbar.css";
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Sean Cheng</div>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a class="underline-animate" href="/">Home</a></li>
        <li><a class="underline-animate" href="/about">About</a></li>
        <li><a class="underline-animate" href="/blog">Blog</a></li>
      </ul>
    </nav>
  );
}
