import "./Notes.css";
import React, { useLayoutEffect, useCallback, useRef } from "react";
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";
import RevealSection from "../../components/RevealSection/RevealSection";
import TypingIn from "../../components/TypingIn/TypingIn";
import portrait from '../../assets/background-piano.jpg';

export default function Notes() {
  return (
    <div className="notes">
      <section className="about">
        <ParallaxImage src={portrait} className="about-portrait"/>
        <div className="about-text">
          <h1>ABOUT<br/>THE ARTIST</h1>          
          <div className="about-bio">
            <AnimatedLine delay={.25}/>
            <RevealSection direction="up" delay={1.25} duration={0.75}>
              <p>
                <br/>
                Hey, I’m Sean! I hope you like the website so far! 
                I'm a graduate of the University of Maryland with a minor in Piano Performance, and I also ended up picking up a Bachelor's degree in Computer Science, too, for fun. 
                I currently teach piano in Anne Arundel, MD.
                <br/><br/>
                It's an understatement to say music has been an influential part of my life. 
                I've dabbled in playing the violin, guitar, and singing, but piano is by far my most played (I've been playing for over 15 years!).
                I can't even begin to gauge how much time I've spent at the piano practicing. 
                Additionally, attending concerts and recitals is a regular activity for me, both as an audience member and as a performer. 
                Oh, and I can't forget to mention that I've been listening to music basically my whole life...but, who hasn't?
                <br/><br/>
                As a musician, I find joy in collaborating with others to make music and performing to share it with others. 
                One of my favorite groups to perform in was the UMD Gamer Symphony Orchestra. Go check them out!
                <br/><br/>
                I built this website to collect my favorite works of music and hopefully help others discover lovely music that can sometimes go unnoticed.
                Don't hesitate to check out below for a few "program notes" to get started.
                Enjoy exploring, and maybe you’ll find your next favorite piece here!
                </p>
            </RevealSection>

            
          </div>
          
        </div>
      </section>

      <div className="program-transition">
        <div className="program-notes-title">
          <TypingIn speed={75}>{"PROGRAM NOTES"}</TypingIn>
        </div>
        <div className="program-shadow">
          <section className="program">
            <h2>PROGRAM</h2>
            <div className="program-items">
              <div className="program-item">
                <div className="row">
                  <p className="left-text">Romantic Reveries, Op. 1</p>
                  <p className="right-text">Sean Cheng (20XX-Present)</p>
                </div>
                <p>Sean Cheng, (computer) keyboard</p>
              </div>
              <div className="program-item">
                <div className="row">
                  <p className="left-text">Limelight Letters, Op. 2</p>
                  <p className="right-text">Sean Cheng (20XX-Alive)</p>
                </div>
                <p>Sean Cheng, keyboard</p>
              </div>
              <div className="program-item">
                <div className="row">
                  <p className="left-text">Select Repertoire Library, Op. 3</p>
                  <p className="right-text">Sean Cheng (20XX-?!?)</p>
                </div>
                <p>Sean Cheng, eardrums</p>
              </div>
              <div className="program-item">
                <div className="row">
                  <p className="left-text">A Postlude, Op. 4</p>
                  <p className="right-text">Sean Cheng (20XX-still here..)</p>
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
      
      
        <section className="all-notes">
        <div className="program-note-row">
          <ParallaxImage src="https://picsum.photos/200/300" className="program-note-row-img"/>
          <div className="note">
            <h2>Op. 1</h2>
            <div className="program-note-text">
              <AnimatedLine delay={0}/>
              <RevealSection direction="up" delay={1} duration={0.75}>
                <p>
                  
                  <br/>
                  <b>Romantic Reveries</b><br/><br/>
                  I have something to admit: I'm utterly obsessed with romanticism in music. An unnatural fixation, if you will.
                  <br/><br/>
                  Let's back up a bit. My favorite era of classical music? Romantic. 
                  In my very humble opinion, no other era comes as close to capturing the emotional expressiveness and depth of music like this one.
                  From Chopin's gorgeous melodies that touch the soul to Liszt's fiery scores that rock the stage, Romantic music stands out like no other.
                  <br/><br/>
                  In this series, Romantic Reveries, I highlight and comment (from a romantic standpoint, nothing too technical) on select pieces of music that tug at your heartstrings.
                  Music that elevates your plane of existence and takes you on an emotional ride every listen. Music that is downright too beautiful for this world.
                  Haha, I'm exaggerating, of course (am I?). Music is subjective after all. 
                  <br/><br/>
                  These selections are not strictly from the Romantic era, however, it should be no surprise that this series heavily leans into its repertoire.
                  I post for this series semi-regularly on the "Posts" page—look for the posts tagged <i>romantic reveries</i>. Join me as I dive into my own "reveries."
                </p>
              </RevealSection>
            </div>
            
          </div>
        </div>

        <div className="program-note-row">
          <div className="note">
            <h2>Op. 2</h2>
            <div className="program-note-text">
              <AnimatedLine delay={0}/>
              <RevealSection direction="up" delay={1} duration={0.75}>
                <p>
                  <br/>
                  <b>Limelight Letters</b><br/><br/>
                  As I mentioned before, I enjoy taking the opportunity to attend concerts and recitals. 
                  This series, Limelight Letters, features the performances I attend as an audience member.
                  I try to catch well-known performers when I can—keep an eye out for those!
                  <br/><br/>
                  The questions I try to answer include, but are not limited to:
                  What was the performance experience like? Who is the performer(s)?
                  What were the strengths of the performance? Was the venue appropriate and effective? How far did I sit because I reserved tickets late? 
                  How strong is the music selection?
                  <br/><br/>
                  Of course, the intention isn’t to overly critique the performers. My posts are reflections based on my recollection of the experiences. 
                  Any opinions I assert should be taken with a very small, fine grain of salt. 
                  <br/><br/>
                  With that said, head to the “Posts” page and look for posts tagged <i>limelight letters</i>.
                  Let’s explore the performers who shine in the limelight.
                </p>
              </RevealSection>
            </div>
          </div>
          <ParallaxImage src="https://picsum.photos/200/300" className="program-note-row-img"/>
        </div>
        
        <div className="program-note-row">
          <ParallaxImage src="https://picsum.photos/200/300" className="program-note-row-img"/>
          <div className="note">
            <h2>Op. 3</h2>
            <div className="program-note-text">
              <AnimatedLine delay={0}/>
              <RevealSection direction="up" delay={1} duration={0.75}>
                <p>
                  <br/>
                  <b>Select Repertoire Library</b><br/><br/>
                  This is a library of themed playlists I curate. If you don't like reading or don't care for my posts (I'm only a little offended), this is a perfect place to get straight to the music.
                  There’s so much music out there that doesn’t always get the recognition it deserves.
                  <br/><br/>
                  At your own leisure, give these playlists a listen. I hope you'll find music that you like and add it to your own playlists. 
                  I can confidently say the music here is beyond phenomenal. After all, I approved and curated it myself!
                </p>
              </RevealSection>
            </div>
            
          </div>
        </div>
        
        <div className="program-note-row">
          <div className="note">
            <h2>Op. 4</h2>
            <div className="program-note-text">
              <AnimatedLine delay={0}/>
              <RevealSection direction="up" delay={1} duration={0.75}>
                <p>
                  <br/>
                  <b>A Postlude</b><br/><br/>
                  A concluding "postlude" to this website. Here, I share a bit more about the website itself.
                  It was a blast to build, and I’m excited to share some of the underlying design details as well as the goals and motivations behind it.
                  <br/><br/>
                  Then I wrap up with acknowledgements and credits for the resources that made this website possible. 
                  Just like a musical performance, there are countless people and processes behind the scenes that make a show truly memorable.
                </p>
              </RevealSection>
            </div>
            
          </div>
          <ParallaxImage src="https://picsum.photos/200/300" className="program-note-row-img"/>
        </div>

      </section>
        
    </div>
  );
}


function ParallaxImage({ src, className, speed = 0.25 }) {
  const containerRef = useRef(null); 
  const imageRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const centerDistance = windowHeight / 2 - (containerRect.top + containerRect.height / 2);
    
    const offset = centerDistance * speed; 

    imageRef.current.style.transform = `translateY(-15%) translateY(${offset}px)`;

  }, [speed]);

  useLayoutEffect(() => {
    let animationFrameId = null;

    const animate = () => {
      handleScroll(); 
      animationFrameId = requestAnimationFrame(animate);
    };

    handleScroll();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleScroll]);

  return (
    <div className={className} ref={containerRef} style={{ overflow: 'hidden' }}>
      <img
        src={src}
        alt=""
        ref={imageRef}
        style={{
          width: "100%",
          height: "150%",
          objectFit: "cover",
          willChange: 'transform'
        }}
      />
    </div>
  );
}
