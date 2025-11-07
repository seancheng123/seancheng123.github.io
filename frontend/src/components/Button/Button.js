import { useState } from "react";
import "./Button.css";

export default function Button({ children, className, onClick }) {
  return (
		<button onClick={onClick} className={`black-button ${className}`}>
            {children}
        </button>
  );
}