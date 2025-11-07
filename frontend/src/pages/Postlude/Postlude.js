import "./Postlude.css";

export default function Postlude() {
	return (
		<div className="postlude-page">
      <section className="postlude-header">
        <h1 className="postlude-title">Postlude</h1>
        <p className="postlude-subtitle">
          A quiet note of gratitude, reflection, and connection.
        </p>
      </section>

      <section className="acknowledgements">
        <h2>Credits & Acknowledgements</h2>
        <p>
          This website was built with appreciation for the open-source community and the
          many tools that make creativity possible. Technologies and resources include:
        </p>
        <ul>
          <li>React — for building the interactive interface</li>
          <li>Vite — for fast and efficient development</li>
          <li>GitHub Pages — for hosting and deployment</li>
          <li>MapLibre & Leaflet — for map-based visualizations</li>
          <li>Unsplash & Picsum — for placeholder imagery</li>
          <li>Google Fonts — for typography and aesthetic balance</li>
        </ul>
      </section>

      <section className="subscribe-section">
        <h2>Stay in Touch</h2>
        <p>
          If you’d like to follow along for new posts, reflections, and updates,
          consider subscribing to the newsletter.
        </p>
        <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="subscribe-input"
          />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </section>

      <section className="contact-section">
        <h2>Contact</h2>
        <p>
          Questions, thoughts, or collaborations? You can reach out at{" "}
          <a href="mailto:your@email.com" className="contact-link">
            your@email.com
          </a>
        </p>
      </section>

      <footer className="postlude-footer">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p>Built with care, curiosity, and a touch of music.</p>
      </footer>
    </div>
	);
}