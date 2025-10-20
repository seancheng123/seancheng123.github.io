import "./Home.css";
import { useState, useEffect } from 'react';
import { ReactComponent as Stage } from "../../assets/stage.svg";
import { ReactComponent as Quill } from "../../assets/quill.svg";
import { ReactComponent as Books } from "../../assets/books.svg";
import { ReactComponent as Rose } from "../../assets/rose.svg";
import { ReactComponent as Candle } from "../../assets/candle.svg";
import AnimatedKey from "../../components/AnimatedKey/AnimatedKey";
import DelayedLink from "../../components/DelayedLink/DelayedLink";
import TypingIn from "../../components/TypingIn/TypingIn";

export default function Home() {

	const [showTitleScreen, setShowTitleScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitleScreen(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="home-content">
			{showTitleScreen && (
        <div className="title-screen">
          <TypingIn speed={60}>sean cheng presents</TypingIn>
        </div>
      )}
      <div className={`piano-keys-scroll ${showTitleScreen ? "hidden" : ""}`}>
        <div className="piano-keys">
          <AnimatedKey delay={5}>
            <DelayedLink to="/repertoire">
              <div className="white-key">
                <p>select repertoire library</p>
                <Books className="books-icon"/>
              </div>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={5.25}>
            <DelayedLink to="/notes">
              <div className="white-key">
                <Quill className="quill-icon"/>
                <p>my program notes</p>
              </div>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={5.5}>
            <DelayedLink to="/postlude">
              <div className="white-key">
                <Candle className="candle-icon"/>
                <p>a postlude</p>
              </div>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={5.75}>
            <DelayedLink to="/reveries">
              <div className="black-key">
                <Rose className="rose-icon"/>
                <p>romantic reveries</p>
              </div>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={6}>
            <DelayedLink to="/letters">
              <div className="black-key">
                <Stage className="stage-icon"/>
                <p>limelight letters</p>
              </div>
            </DelayedLink>
          </AnimatedKey>
        </div>
      </div>
    </section>
  );
}
