import "./Home.css";
import { useEffect, useRef } from "react";
import { ReactComponent as Stage } from "../../assets/stage.svg";
import { ReactComponent as Quill } from "../../assets/quill.svg";
import { ReactComponent as Books } from "../../assets/books.svg";
import { ReactComponent as Rose } from "../../assets/rose.svg";
import { ReactComponent as Candle } from "../../assets/candle.svg";
import DecorativeKey from "../../components/DecorativeKey/DecorativeKey";
import RevealSection from "../../components/RevealSection/RevealSection";

export default function Home() {
	const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const centerScroll = () => {
      if (window.innerWidth <= 1000) {
        const scrollTo = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollLeft = scrollTo;
      } else {
        el.scrollLeft = 0;
      }
    };

    requestAnimationFrame(centerScroll);

    // Optional: re-run on resize
    window.addEventListener("resize", centerScroll);
    return () => window.removeEventListener("resize", centerScroll);
  }, []);

  return (
		<section className="home-content" ref={scrollRef}>
			<div class="side-keys">
				<RevealSection delay={4.5} direction="up">
					<div className="f-key">
						<DecorativeKey delay={0}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<defs>
									<linearGradient id="grayGradient" x1="0" y1="0" x2="1" y2="1">
										<stop offset="0%" stop-color="#FAFAF8" /> 
										<stop offset="50%" stop-color="#F2F2F0" /> 
										<stop offset="100%" stop-color="#E9E9E7" />
									</linearGradient>
								</defs>

								<polygon
									points="0 0, 4.25 0, 4.25 31.2, 20 31.2, 20 60, 0 60"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={4} direction="up">
					<div className="g-key">
						<DecorativeKey delay={500}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="5.25 0, 9.5 0, 9.5 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 5.25 31.2"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={3.5} direction="up">
					<div className="a-key">
						<DecorativeKey delay={1000}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="10.5 0, 14.75 0, 14.75 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 10.5 31.2"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={3} direction="up">
					<div className="b-key">
						<DecorativeKey delay={1500}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="0 31.2, 15.75 31.2, 15.75 0, 20 0, 20 31.2, 20 60, 0 60"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>

				<RevealSection delay={4.25} direction="down">
					<div className="f-sharp">
						<DecorativeKey delay={250}>
							<div className="bg-black-key">

							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={3.75} direction="down">
					<div className="g-sharp">
						<DecorativeKey delay={750}>
							<div className="bg-black-key">
								
							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={3.25} direction="down">
					<div className="b-flat">
						<DecorativeKey delay={1250}>
							<div className="bg-black-key">

							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
			</div>

			<div class="keys">
				<RevealSection delay={1} direction="up">
					<div className="c-key">
						<a class="white-key-animations" href="/#">
							<p>select repertoire library</p>
							<Books class="books-icon"/>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<defs>
									<filter id="shadow">
										<feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--color-gray)" flood-opacity="0.5"/>
									</filter>
									<filter id="shadow-hover">
										<feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--color-gray)" flood-opacity="0.8"/>
									</filter>
								</defs>
								
								<polygon
									points="0 0, 6 0, 6 31.2, 20 31.2, 20 60, 0 60"
									fill="white"
									stroke="var(--color-gray)"
									stroke-width="0.01"
									filter="url(#shadow)"
								/>
							</svg>
						</a>
					</div>
				</RevealSection>
				
				<RevealSection delay={0} direction="up">
					<div className="d-key">
						<a class="white-key-animations" href="/blog">
							<p>my program notes</p>
							<Quill class="quill-icon"/>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="7 0, 13 0, 13 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 7 31.2"
									fill="white"
									stroke="var(--color-gray)"
									stroke-width="0.01"
									filter="url(#shadow)"
								/>
							</svg>
						</a>
						
					</div>
				</RevealSection>

				<RevealSection delay={1} direction="up">
					<div className="e-key">
						<a class="white-key-animations" href="/#">
							<p>a postlude</p>
							<Candle class="candle-icon"/>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="0 31.2, 14 31.2, 14 0, 20 0, 20 31.2, 20 60, 0 60"
									fill="white"
									stroke="var(--color-gray)"
									stroke-width="0.01"
									filter="url(#shadow)"
								/>
							</svg>
						</a>
					</div>
				</RevealSection>

				<RevealSection delay={0.5} direction="down">
					<div className="c-sharp">
						<a class="black-key-container black-key-animations" href="/about">
							<p>romantic reveries</p>
							<Rose class="rose-icon"/>
						</a>
					</div>
				</RevealSection>

				<RevealSection delay={0.5} direction="down">
					<div className="e-flat">
						<a class="black-key-container black-key-animations" href="/about">
							<p>limelight letters</p>
							<Stage class="stage-icon"/>
						</a>
					</div>
				</RevealSection>
			</div>

			<div class="side-keys">
				<RevealSection delay={3} direction="up">
					<div className="f-key">
						<DecorativeKey delay={1750}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="0 0, 4.25 0, 4.25 31.2, 20 31.2, 20 60, 0 60"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
						
					</div>
				</RevealSection>
				<RevealSection delay={3.5} direction="up">
					<div className="g-key">
						<DecorativeKey delay={2250}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="5.25 0, 9.5 0, 9.5 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 5.25 31.2"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={4} direction="up">
					<div className="a-key">
						<DecorativeKey delay={2750}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="10.5 0, 14.75 0, 14.75 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 10.5 31.2"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={4.5} direction="up">
					<div className="b-key">
						<DecorativeKey delay={3250}>
							<svg class="key-border" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
								<polygon
									points="0 31.2, 15.75 31.2, 15.75 0, 20 0, 20 31.2, 20 60, 0 60"
									fill="url(#grayGradient)"
									stroke="var(--color-gray)"
									stroke-width="0"
								/>
							</svg>
						</DecorativeKey>
					</div>
				</RevealSection>

				<RevealSection delay={3.25} direction="down">
					<div className="f-sharp">
						<DecorativeKey delay={2000}>
							<div className="bg-black-key">

							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={3.75} direction="down">
					<div className="g-sharp">
						<DecorativeKey delay={2500}>
							<div className="bg-black-key">

							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
				<RevealSection delay={4.25} direction="down">
					<div className="b-flat">
						<DecorativeKey delay={3000}>
							<div className="bg-black-key">

							</div>
						</DecorativeKey>
					</div>
				</RevealSection>
			</div>
		</section>
  );
}