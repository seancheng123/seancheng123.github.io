import { useNavigate } from "react-router-dom";

export default function DelayedLink({ to, children, className }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    el.classList.add('pressed');

    setTimeout(() => {
      navigate(to);
    }, 250);
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
