import SubscribeSubmit from "../SubscribeSubmit/SubscribeSubmit";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { AiOutlineSpotify } from "react-icons/ai";
import MusicalLink from "../../components/MusicalLink/MusicalLink";
import "./Footer.css";

export default function Footer() {
    return (
			<footer className="site-footer">
				<div className="footer-content">
					<div className="footer-sections">
						<div className="footer-branding">
							<h1 className="footer-logo">sean cheng</h1>
							<p>United States</p>
							<p>email@email.com</p>
							<div className="icons">
								<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
									<FaLinkedinIn size={20}/>
								</a>
								<a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
									<FiGithub size={20}/>
								</a>
								<a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
									<AiOutlineSpotify size={25}/>
								</a>
							</div>
						</div>
						<nav className="footer-nav">
							<h1>Quick Links</h1>
							<MusicalLink className="underline-animate" href="/">The Foyer</MusicalLink>
							<MusicalLink className="underline-animate" href="/notes">Program Notes</MusicalLink>
							<MusicalLink className="underline-animate" href="/reveries">Romantic Reveries</MusicalLink>
							<MusicalLink className="underline-animate" href="/letters">Limelight Letters</MusicalLink>
							<MusicalLink className="underline-animate" href="/repertoire">Repertoire</MusicalLink>
							<MusicalLink className="underline-animate" href="/postlude">Postlude</MusicalLink>
						</nav>
						<div className="subscribe">
							<h1>Subscribe</h1>
							<SubscribeSubmit/>
						</div>
					</div>
					<hr className="footer-divider"/>
					<p className="copyright">© 2025 Sean Cheng. All rights reserved.</p>
				</div>
			</footer>
    );
}