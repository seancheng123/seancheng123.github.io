import SubscribeSubmit from "../SubscribeSubmit/SubscribeSubmit";
import { Linkedin } from 'lucide-react';
import "./Footer.css";

export default function Footer() {
    return (
			<footer class="site-footer">
				<div class="footer-content">
					<div class="footer-sections">
						<div class="footer-branding">
							<p class="footer-header">Sean Cheng</p>
							<p>United States</p>
							<p>email@email.com</p>
							<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="social-icon">
								<Linkedin/>
							</a>
						</div>
						<nav class="footer-nav">
							<p class="footer-header">Quick Links</p>
							<a class="underline-animate" href="/">Home</a>
							<a class="underline-animate" href="/about">About</a>
							<a class="underline-animate" href="/blog">Blog</a>
						</nav>
						<div class="subscribe">
							<p class="footer-header">Subscribe</p>
							<SubscribeSubmit/>
						</div>
					</div>
					<hr class="divider"/>
					<p class="copyright">© 2025 Sean Cheng. All rights reserved.</p>
				</div>
			</footer>
    );
}