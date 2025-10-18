import "./Notes.css";
import { useState, useEffect } from 'react';
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";
import RevealSection from "../../components/RevealSection/RevealSection";
import TypingIn from "../../components/TypingIn/TypingIn";
import portrait from '../../assets/background-piano.jpg';

export default function Notes() {
  return (
    <div className="notes">
      <section className="about">
        <ParallaxImage src={portrait}/>
        <div className="about-text">
          <div className="about-title">
            <TypingIn speed={75}>{"ABOUT\nTHE ARTIST"}</TypingIn>
          </div>
          
          <div className="about-bio">
            <AnimatedLine delay={1.5}/>
            <RevealSection direction="up" delay={2.5} duration={0.75}>
              <p>
                <br/>
                <b>Sean Cheng</b>, pianist, computer keyboardist<br/><br/>
                Sean Cheng is a pianist, composer, and writer exploring the emotional landscapes of music and memory. Through performance and reflection, he seeks to capture the fleeting moments where sound meets sentiment — where a melody becomes more than notes on a page. His work blends classical tradition with personal introspection, inviting listeners and readers alike to pause, feel, and listen more closely.
              </p>
            </RevealSection>

            
          </div>
          
        </div>
      </section>

      <div className="program-notes-title">
        <TypingIn speed={75}>{"PROGRAM NOTES"}</TypingIn>
      </div>
      
      <section className="program-section">      
         <div className="all-notes">

          <div className="note">
            <AnimatedLine delay={1}/>
            <RevealSection direction="up" delay={2} duration={0.75}>
              <p>
                <br/>
                <b>Romantic Reveries, Op. 1</b><br/><br/>
                Romantic Reveries is a collection of reflections inspired by music, literature, and the subtle beauty of everyday moments. Here, melodies intertwine with memory, and the quiet spaces between notes become as meaningful as the music itself. Each entry explores fleeting impressions—moments of awe, melancholy, joy, or wonder—capturing the emotions that linger long after the performance has ended.
              </p>
            </RevealSection>
          </div>
          
          <div className="note">
            <AnimatedLine delay={1}/>
            <RevealSection direction="up" delay={2} duration={0.75}>
              <p>
                <br/>
                <b>Limelight Letters, Op. 2</b><br/><br/>
                Limelight Letters is a chronicle of live performances, offering personal insights and reflections from moments on and off the stage. Each letter is a tribute to the performers, the atmosphere, and the subtle magic that arises when artist and audience share a space of heightened awareness.
              </p>
            </RevealSection>
          </div>
          

          <div className="note">
            <AnimatedLine delay={1}/>
            <RevealSection direction="up" delay={2} duration={0.75}>
              <p>
                <br/>
                <b>Select Repertoire Library</b><br/><br/>
                The Repertoire Library is a curated archive of works, compositions, and scores that have shaped and inspired my musical journey. Each entry in the library offers context, insight, and a glimpse into the layers of history, creativity, and interpretation behind a piece.
              </p>
            </RevealSection>
            
          </div>
          

          <div className="note">
            <AnimatedLine delay={1}/>
            <RevealSection direction="up" delay={2} duration={0.75}>
              <p>
                <br/>
                
                <b>A Postlude</b><br/><br/>
                Postlude is a space for reflection, acknowledgment, and quiet contemplation at the close of a journey. Much like the final notes of a musical performance, this section honors the voices and contributions that have made the site and its content possible. Here, you’ll find recognition of collaborators, inspirations, and supporters, as well as a brief glimpse into the origins, purpose, and aspirations of the project itself.
              </p>
            </RevealSection>
            
          </div>

          
        </div>

        <div className="program-scroll">
          <div className="program-shadow">
            <section className="program">
              <h1>PROGRAM</h1>
              <div className="program-items">
                <div className="program-item">
                  <div className="row">
                    <p className="left-text">Romantic Reveries, Op. 1</p>
                    <p>Sean Cheng (20XX-Present)</p>
                  </div>
                  <p>Sean Cheng, (computer) keyboard</p>
                </div>
                <div className="program-item">
                  <div className="row">
                    <p className="left-text">Limelight Letters, Op. 2</p>
                    <p>Sean Cheng (20XX-Alive)</p>
                  </div>
                  <p>Sean Cheng, keyboard</p>
                </div>
                <div className="program-item">
                  <div className="row">
                    <p className="left-text">Select Repertoire Library</p>
                    <p>Sean Cheng (20XX-?!?)</p>
                  </div>
                  <p>Sean Cheng, eardrums</p>
                </div>
                <div className="program-item">
                  <div className="row">
                    <p className="left-text">A Postlude</p>
                    <p>Sean Cheng (20XX-still here..)</p>
                  </div>
                  <p>Sean Cheng, keyboard</p>
                </div>
              </div>
              
              <div className="program-bottom-text">
                <p>Please unsilence all devices and do not refrain from flash photography. Food and drink are allowed. Presented in partial fulfillment for the Bachlor of Employment degree in software engineering.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function ParallaxImage({ src }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const maxOffset = -50;
    
    const handleScroll = () => {
      let newOffset = -window.scrollY * 0.1;
      setOffset(Math.max(newOffset, maxOffset));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="about-portrait"
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "150%",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.25s ease-out",
          willChange: "transform",
          objectFit: "cover",
        }}
      />
    </div>
  );
}