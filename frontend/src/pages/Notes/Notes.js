import "./Notes.css";
import React, { useLayoutEffect, useCallback, useRef, useState, useEffect, useImperativeHandle } from "react";
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";
import RevealSection from "../../components/RevealSection/RevealSection";
import portrait from '../../assets/portrait.png';
import sky from '../../assets/sky.jpg'
import book from '../../assets/book.jpg'
import flower from '../../assets/flower.jpg'
import stage from '../../assets/stage.jpeg'
import sheetmusic from '../../assets/sheetmusic.jpg'


export default function Notes() {
  const spacerRef = useRef();

  return (
    <div id="notes">
      <div className="scroll-spacer" ref={spacerRef}>
        <ImageTrack spacerRef={spacerRef}/>
      </div>      
    </div>
  );
}

const ImageTrack = React.memo(({ spacerRef }) => {
  const trackRef = useRef(null);
  const originals = useRef([]);
  const clones = useRef(null);
  const [currentWindow, setCurrentWindow] = useState(-1);
  const transitionRef = useRef(false);
  const currentOriginalContainer = useRef(null);
  const previousWindow = useRef(-1);
  

  useEffect(() => {
    if (originals.current.length > 0) {
      clones.current = originals.current.map((orig) => createClone(orig));
    }
  }, []);

  function setZs(currentIndex, prevIndex) {
    clones.current = clones.current.map((clone, index) => {
      let z;
      if (index === currentIndex) {
        z = 50;
      }
      else if (index === prevIndex) {
        z = 49;
      }
      else {
        z = 48;
      }
      clone.style.zIndex = String(z);
      return clone;
   });
  }

  useEffect(() => {
    clones.current.forEach((clone, index) => {
      if(index == 2) console.log(clone);
    });
    if (currentWindow === -1) {
      document.body.style.overflow = '';
    }
    else if (currentWindow > -1) {
      if (!clones.current) return;

      document.body.style.overflow = 'hidden';
      if (previousWindow.current !== -1) {
        console.log('current window: ' + currentWindow + ' prevwindow: ' + previousWindow.current);
        const currentClone = clones.current[currentWindow];
        const previousClone = clones.current[previousWindow.current];

        if (currentWindow > previousWindow.current) {          
          currentClone.style.display = 'block';
          setZs(currentWindow, previousWindow.current);
          
          requestAnimationFrame(() => {
            currentClone.classList.add('slide-from-right');
          })
          
          setTimeout(() => {
            currentClone.classList.remove('slide-from-right')
          }, 1000);
        }
        else if (currentWindow < previousWindow.current) {
          currentClone.style.display = 'block';
          setZs(currentWindow, previousWindow.current);

          requestAnimationFrame(() => {
            currentClone.classList.add('slide-from-left');
          })
          
          setTimeout(() => {
            currentClone.classList.remove("slide-from-left");
          }, 1000);
        }
        else {
          // Do nothing, user reached beginning or end
        }
      }
      else {
        clones.current.forEach((clone, index) => {
          expandClone(clone, clone.querySelector('.track-image'));
          if (index == currentWindow) {
            clone.style.zIndex = '51';
          }
        })
      }
    }
    if (originals.current) {
      currentOriginalContainer.current = originals.current[currentWindow];
    }
  }, [currentWindow]);

  
  const currentOffset = useRef(0);

  const handleScroll = useCallback(() => {
    if (!trackRef.current || !spacerRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const scrollY = window.scrollY - spacerRef.current.offsetTop;
    const totalScrollDistance = 3 * window.innerHeight; // 300vh
    const totalTranslationDistance = 125;

    const scrollProgress = Math.max(0, Math.min(scrollY / totalScrollDistance, 1));
    const targetOffset = scrollProgress * totalTranslationDistance;

    return {
      targetOffset,
      baseX: (window.innerWidth / 2) - (trackRect.width / 12),
    };
  }, [trackRef, spacerRef]);

  useLayoutEffect(() => {
    let animationFrameId = null;
    let target = 0;

    const animate = () => {
      const scrollData = handleScroll();
      if (scrollData && trackRef.current) {
        const { targetOffset, baseX } = scrollData;
        target = targetOffset;

        currentOffset.current = lerp(currentOffset.current, target, 0.025);

        trackRef.current.style.transform = 
          `translateX(${baseX}px) translateX(${-currentOffset.current}%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [handleScroll]);

  function createClone(originalContainer) {
    const originalImage = originalContainer.querySelector('.track-image');
    const cloneContainer = originalContainer.cloneNode(true);
    const cloneImage = cloneContainer.querySelector('.track-image');
    cloneContainer.style.display = 'none';
    cloneContainer.style.justifyContent = 'end';
    if (cloneContainer.querySelector(".note")) {
      cloneContainer.querySelector(".note").style.display = 'none';
    }
    cloneContainer.style.margin = '0';
    cloneContainer.style.zIndex = '50';
    document.getElementById("notes").appendChild(cloneContainer);
    cloneContainer.id = 'clone';

    const handleExit = (e) => {
      e.stopPropagation();
      
      if (transitionRef.current || !currentOriginalContainer.current) {
        return;
      }

      console.log("exiting");

      transitionRef.current = true;
      const originalRect = currentOriginalContainer.current.getBoundingClientRect();
      const originalImage = currentOriginalContainer.current.querySelector(".track-image");

      cloneContainer.style.transition = 'all 1s cubic-bezier(0.1, 0.9, 0.5, 1)';
      cloneImage.style.transition = 'all 1s cubic-bezier(0.1, 0.9, 0.5, 1)';
      requestAnimationFrame(() => {
        cloneContainer.style.top = `${originalRect.top}px`;
        cloneContainer.style.left = `${originalRect.left}px`;
        cloneContainer.style.width = `${originalRect.width}px`;
        cloneContainer.style.height = `${originalRect.height}px`;
        cloneImage.style.transform = originalImage.style.transform;
        cloneImage.style.height = originalImage.style.height;
        cloneImage.style.width = originalImage.style.width;
      });
      
      shrinkClones();
      currentOriginalContainer.current = null;
      setTimeout(() => {
        if (originalContainer) {
          originalContainer.style.opacity = '1';
        }
        cloneContainer.style.display = 'none';
        cloneContainer.style.transition = '';
        cloneImage.style.transition = '';
        transitionRef.current = false;
        previousWindow.current = -1;
        setCurrentWindow(-1);
      }, 1000);
    };

    cloneContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      if (transitionRef.current) return;

      transitionRef.current = true;

      if (e.clientX < window.innerWidth / 2) {
        setCurrentWindow(prevWindow => {
          previousWindow.current = prevWindow;
          return Math.max(prevWindow - 1, 0);
        });
      }
      else {
        setCurrentWindow(prevWindow => {
          previousWindow.current = prevWindow;
          return Math.min(prevWindow + 1, originals.current.length - 1);
        });
      }

      setTimeout(() => {
        transitionRef.current = false;
      }, 1000);
    })
    cloneContainer.onwheel = handleExit;
    
    return cloneContainer;
  }

  function shrinkClones() {    
    clones.current.forEach((cloneContainer, index) => {
      if (index != originals.current.indexOf(currentOriginalContainer.current)) {
        const originalRect = originals.current[index].getBoundingClientRect();
        const originalImage = originals.current[index].querySelector(".track-image");
        const cloneImage = cloneContainer.querySelector(".track-image");

        cloneContainer.style.top = `${originalRect.top}px`;
        cloneContainer.style.left = `${originalRect.left}px`;
        cloneContainer.style.width = `${originalRect.width}px`;
        cloneContainer.style.height = `${originalRect.height}px`;
        cloneContainer.style.zIndex = '50';
        cloneContainer.style.transition = '';
        cloneContainer.style.display = 'none';
        cloneContainer.style.transform = originals.current[index].style.transform;

        cloneImage.style.transform = originalImage.style.transform;
        cloneImage.style.height = originalImage.style.height;
        cloneImage.style.width = originalImage.style.width;
        cloneImage.style.transition = '';
      }
    })
    
  }

  function openClone(cloneContainer, originalContainer) {
    const cloneImage = cloneContainer.querySelector(".track-image");
    const originalImage = originalContainer.querySelector(".track-image");
    const rect = originalContainer.getBoundingClientRect();
    cloneContainer.style.display = 'block';
    cloneContainer.style.position = 'fixed';
    cloneContainer.style.top = `${rect.top}px`;
    cloneContainer.style.left = `${rect.left}px`;
    cloneContainer.style.width = `${rect.width}px`;
    cloneContainer.style.height = `${rect.height}px`;
    cloneContainer.style.transition = 'all 1s cubic-bezier(0.1, 0.9, 0.5, 1)';
    if (cloneContainer.querySelector(".note")) {
      cloneContainer.querySelector(".note").style.display = 'block';
    }
    cloneContainer.style.transform = originalContainer.style.transform;

    cloneImage.style.transform = originalImage.style.transform;
    cloneImage.style.transition = 'all 1s cubic-bezier(0.1, 0.9, 0.5, 1)';
    requestAnimationFrame(() => {
      expandClone(cloneContainer, cloneImage);
    });
    setCurrentWindow(clones.current.indexOf(cloneContainer));
  }

  function expandClone(cloneContainer, cloneImage) {
    cloneContainer.style.position = 'fixed';
    cloneContainer.style.width = '100vw';
    cloneContainer.style.height = '100vh';
    cloneContainer.style.top = '0';
    cloneContainer.style.left = '0';
    cloneContainer.style.transform = '';
    cloneImage.style.transform = 'none';
    cloneImage.style.width = '100%';
    cloneImage.style.height = '100%';
    cloneImage.style.position = 'absolute';
    cloneImage.style.top = 0;
    cloneImage.style.left = 0;
  }

  const TrackImage = React.forwardRef(({ src, onClick, children }, forwardedRef) => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useImperativeHandle(forwardedRef, () => containerRef.current);

    const handleScroll = useCallback(() => {
      if (!imageRef.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const centerDistance = windowWidth / 2 - (containerRect.left + containerRect.width / 2);
      const offset = 25 * (centerDistance / (windowWidth / 2));
      imageRef.current.style.transform = `translateX(-33%) translateX(${-offset}%)`;
    }, []);

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
      <div className="track-image-container" ref={containerRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <img src={src} alt="" ref={imageRef} draggable="false" className="track-image" />
        {children}
      </div>
    );
  });


  return (
    <div className="program-track" ref={trackRef}>
      <TrackImage
        src={sky}
        ref={(el) => (originals.current[0] = el)}
        onClick={() => {openClone(clones.current?.[0], originals.current?.[0])}}
      >
        <section className="about">
          <img src={portrait} className="about-portrait"/>
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
      </TrackImage>
      <TrackImage
        src={flower}
        ref={(el) => (originals.current[1] = el)}
        onClick={() => {openClone(clones.current?.[1], originals.current?.[1])}}
      >
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
              <p>
                Please unsilence all devices and do not refrain from flash photography. Food and drink are allowed. Presented in partial fulfillment for the Bachlor of Employment degree in software engineering.
              </p>
            </div>
          </section>
        </div>
      </TrackImage>

      <TrackImage
        src={stage}
        ref={(el) => (originals.current[2] = el)}
        onClick={() => {openClone(clones.current?.[2], originals.current?.[2])}}
      >
        <div className="note">
          <h2>Op. 1</h2>
          <div className="program-note-text">
            <AnimatedLine delay={0}/>
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
          </div>
        </div>
      </TrackImage>

      <TrackImage
        src={book}
        ref={(el) => (originals.current[3] = el)}
        onClick={() => {openClone(clones.current?.[3], originals.current?.[3])}}
      >
        <div className="note">
          <h2>Op. 2</h2>
          <div className="program-note-text">
            <AnimatedLine delay={0}/>
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
          </div>
        </div>
      </TrackImage>

      <TrackImage
        src={sheetmusic}
        ref={(el) => (originals.current[4] = el)}
        onClick={() => {openClone(clones.current?.[4], originals.current?.[4])}}
      >
        <div className="note">
          <h2>Op. 3</h2>
          <div className="program-note-text">
            <AnimatedLine delay={0}/>
            <RevealSection direction="up" delay={0.5} duration={0.75}>
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
      </TrackImage>

      <TrackImage
        src={sky}
        ref={(el) => (originals.current[5] = el)}
        onClick={() => {openClone(clones.current?.[5], originals.current?.[5])}}
      >
        <div className="note">
          <h2>Op. 4</h2>
          <div className="program-note-text">
            <AnimatedLine delay={0}/>
            <RevealSection direction="up" delay={0.5} duration={0.75}>
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
      </TrackImage>
    </div>
  );

});
