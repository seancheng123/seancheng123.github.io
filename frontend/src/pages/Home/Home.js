import "./Home.css";
import { ReactComponent as Stage } from "../../assets/stage.svg";
import { ReactComponent as Quill } from "../../assets/quill.svg";
import { ReactComponent as Books } from "../../assets/books.svg";
import { ReactComponent as Rose } from "../../assets/rose.svg";
import { ReactComponent as Candle } from "../../assets/candle.svg";
import AnimatedKey from "../../components/AnimatedKey/AnimatedKey";
import DelayedLink from "../../components/DelayedLink/DelayedLink";
import LandingScene from "../../components/LandingScene/LandingScene";
import { useRef } from 'react';

const notes = ["♪", "♫", "♩", "♬"];

export default function Home() {
  const numNotes = 8;

  const generateNoteStyles = () => {
    const size = Math.random() * 8 + 8;
    const top = Math.random() * 100 - 25;
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * 20 + 2;

    return {
      fontSize: `${size}vh`,
      top: `${top}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    };
  };

  const homeRef = useRef(null);

  return (
    <div className="home" ref={homeRef}> 
      <section className="landing">
        <LandingScene homeRef={homeRef}/>
      </section>
      {/*
      <section className="piano-keys-navigation">
        <div className="piano-keys">
          <AnimatedKey delay={1}>
            <DelayedLink to="/repertoire" className="white-key">
              <p>select repertoire library</p>
              <Books className="books-icon"/>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={1.25}>
            <DelayedLink to="/notes" className="white-key">
              <Quill className="quill-icon"/>
              <p>my program notes</p>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={1.5}>
            <DelayedLink to="/postlude" className="white-key">
              <Candle className="candle-icon"/>
              <p>a postlude</p>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={1.75}>
            <DelayedLink to="/posts" className="black-key">
              <Rose className="rose-icon"/>
              <p>romantic reveries</p>
            </DelayedLink>
          </AnimatedKey>

          <AnimatedKey delay={2}>
            <DelayedLink to="/posts" className="black-key">
              <Stage className="stage-icon"/>
              <p>limelight letters</p>
            </DelayedLink>
          </AnimatedKey>
        </div>
      </section>
      */}
    </div>
    
  );
}
