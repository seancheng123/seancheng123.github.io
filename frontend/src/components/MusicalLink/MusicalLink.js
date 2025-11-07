import { useRef } from 'react';
import './MusicalLink.css';

export default function MusicalLink({ href, children, className = '' }) {
  const linkRef = useRef();

  const handleClick = () => {
    const link = linkRef.current;
    const MAX_NOTES = 50;
    const liveNotes = document.querySelectorAll(".flying-note").length;

    if (liveNotes >= MAX_NOTES) return;

    for (let i = 0; i < 1; i++) {
      const note = document.createElement('span');
      note.className = 'flying-note';

      const inner = document.createElement('span');
      inner.className = 'sway-wrapper';
      inner.innerText = ['♪', '♩', '♫', '♬'][Math.floor(Math.random() * 4)];
      note.appendChild(inner);

      const drift = (Math.random() - 0.5) * 8;
      const rotation = (Math.random() - 0.5) * 90;
      const duration = 1 + Math.random() * 1;

      const easings = ['ease-out', 'ease-in-out', 'linear', 'ease', 'ease-in'];
      note.style.animationTimingFunction = easings[Math.floor(Math.random() * easings.length)];
      note.style.animationDuration = `${duration}s`;
      note.style.setProperty('--drift-x', `${drift}rem`);
      note.style.setProperty('--rotate', `${rotation}deg`);
			note.style.setProperty('--duration', `${duration}s`);
      note.style.left = `${Math.random() * 100}%`;
      note.style.fontSize = `${1 + Math.random() * 1}rem`;

      link.appendChild(note);

      setTimeout(() => note.remove(), duration * 1000);
    }
  };

  return (
    <a
      href={href}
      ref={linkRef}
      className={`musical-link ${className}`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
