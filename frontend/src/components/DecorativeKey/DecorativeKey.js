import "./DecorativeKey.css";

export default function DecorativeKey({ children, delay }) {
	const pressDuration = 5000;
	const minDelay = 6000;

  return (
    <div
      style={{
        display: "inline-block",
        animation: `pressCycle ${pressDuration}ms ease-in-out ${minDelay + delay}ms infinite`,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}
