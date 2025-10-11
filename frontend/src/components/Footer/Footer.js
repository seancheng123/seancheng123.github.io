import SubscribeSubmit from "../SubscribeSubmit/SubscribeSubmit";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { AiOutlineSpotify } from "react-icons/ai";
import "./Footer.css";

export default function Footer() {
    return (
			<footer class="site-footer">
				<div class="footer-content">
					<div class="footer-sections">
						<div class="footer-branding">
							<h1 class="footer-header">Sean Cheng</h1>
							<p>United States</p>
							<p>email@email.com</p>
							<div class="icons">
								<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="social-icon">
									<FaLinkedinIn size={20}/>
								</a>
								<a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="social-icon">
									<FiGithub size={20}/>
								</a>
								<a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" class="social-icon">
									<AiOutlineSpotify size={25}/>
								</a>
							</div>
						</div>
						<nav class="footer-nav">
							<h1 class="footer-header">Quick Links</h1>
							<a class="underline-animate" href="/#">The Foyer</a>
							<a class="underline-animate" href="/about">Program Notes</a>
							<a class="underline-animate" href="/blog">Romantic Reveries</a>
							<a class="underline-animate" href="/blog">Limelight Letters</a>
							<a class="underline-animate" href="/">Repertoire</a>
							<a class="underline-animate" href="/">Postlude</a>
						</nav>
						<div class="subscribe">
							<h1 class="footer-header">Subscribe</h1>
							<SubscribeSubmit/>
						</div>
					</div>
					<hr class="divider"/>
					<p class="copyright">© 2025 Sean Cheng. All rights reserved.</p>
				</div>
			</footer>
    );
}