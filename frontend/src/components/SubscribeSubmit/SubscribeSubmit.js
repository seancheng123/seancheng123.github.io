import { useState } from "react";
import "./SubscribeSubmit.css";

export default function SubscribeSubmit() {
	const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (submitted) return;

    setSubmitted(true);
		setEmail("");

    setTimeout(() => {
      setSubmitted(false);
    }, 3000); 
  };

  return (
    <div className="email-input">
			<input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitted} />
			<button onClick={handleSubmit}>Submit</button>
			{submitted && <div class="submit-message">Submitted!</div>}
    </div>
  );
}
