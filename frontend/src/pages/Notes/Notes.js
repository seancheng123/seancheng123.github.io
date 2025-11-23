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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Notes = React.memo(() => {
  const scrollRef = useRef();

  const trackRef = useRef(null);
  const originals = useRef([]);
  const imageRefs = useRef([]);
  const previewTrack = useRef(null);

  const clones = useRef(null);
  const cloneImages = useRef(null);
  const previews = useRef([]);
  const previewImages = useRef([]);
  const cloneNotes = useRef(null);
  const [currentWindow, setCurrentWindow] = useState(-1);
  const transitionRef = useRef(false); //Throttle user interactions
  const previousWindow = useRef(-1);
  const isExit = useRef(false);

  const currScrollTrigger = useRef(null);
  

  function configureScrollingWrapper() {
    requestAnimationFrame(() => {
      configureScrolling();
    })
  }
  function configureScrolling(index = 0) {
    if (!originals.current) return;
    const firstImageOffset = (window.innerWidth / 2) - (originals.current[0].offsetLeft + originals.current[0].offsetWidth / 2);
    const lastImageOffset = -trackRef.current.scrollWidth + window.innerWidth / 2 + (originals.current[originals.current.length - 1].offsetWidth / 2);

    if (currScrollTrigger.current) currScrollTrigger.current.kill();
    
    setScroll(index);

    currScrollTrigger.current = gsap.fromTo(trackRef.current, 
      { x: firstImageOffset }, 
      {
        x: lastImageOffset, 
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        overwrite: true
      }
    );
    
  }

  function setScroll(index = 0) {
    if (!originals.current) return;
    console.log(originals.current[0]);
    const firstImageOffset = (window.innerWidth / 2) - (originals.current[0].offsetLeft + originals.current[0].offsetWidth / 2);
    const lastImageOffset = -trackRef.current.scrollWidth + window.innerWidth / 2 + (originals.current[originals.current.length - 1].offsetWidth / 2);

    const scrollStart = 0;
    const scrollEnd = scrollRef.current.offsetHeight - window.innerHeight;
    
    const targetEl = originals.current[index];
console.log(targetEl);
    const imageCenter = targetEl.offsetLeft + targetEl.offsetWidth / 2;
    const targetX = window.innerWidth / 2 - imageCenter;

    const totalXRange = lastImageOffset - firstImageOffset;
    
    const relativePosition = targetX - firstImageOffset; 
    
    let progress = relativePosition / totalXRange;

    progress = Math.min(1, Math.max(0, progress));

    const scrollLength = scrollEnd - scrollStart;
    
    const targetScrollY = scrollStart + (scrollLength * progress);

    window.scrollTo(0, targetScrollY);
  }


  /* On mount create clones */
  useEffect(() => {
    if (!originals.current || !trackRef.current) return;

    transitionRef.current = true;
    

    if (originals.current.length > 0) {
      clones.current = originals.current.map((orig, index) => createClone(orig, index));
      cloneImages.current = clones.current.map((clone) => clone.querySelector('.track-image'));
      cloneNotes.current = clones.current.map((clone) => clone.querySelector('.note-content'));
    }

    const tl = gsap.timeline({ paused: true });
    const firstImageOffset = (window.innerWidth / 2) - (originals.current[0].offsetLeft + originals.current[0].offsetWidth / 2);
    tl.set(trackRef.current,
      {
        x: -trackRef.current.scrollWidth,
      }
    );
    
    tl.to(trackRef.current,
      {
        x: firstImageOffset,
        duration: 2.5,
        ease: 'power2.out',
      },
      1
    );
    originals.current.forEach((container, index) => {
      tl.fromTo(container, 
        {
          scale: 0,
        },
        {
          duration: 2,
          ease: 'power1.out',
          scale: 1,
        },
        0.9 + (0.1 * (originals.current.length - index))
      )
    });
    tl.eventCallback('onComplete', () => {
      setCurrentWindow(0);
      window.addEventListener('resize', configureScrollingWrapper);
    });
    
    tl.play();
    
    return () =>{
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.trigger === scrollRef.current && st.kill());
      if (clones.current) {
        clones.current.forEach(clone => {
          if (clone.parentNode) {
              clone.parentNode.removeChild(clone);
          }
        });
        clones.current = null;
      }
      window.removeEventListener('resize', configureScrollingWrapper);
    }
  }, []);


  /* Stack windows */
  function setZs(currentIndex) {
    clones.current = clones.current.map((clone, index) => {
      let z;
      if (index === currentIndex) {
        z = 50;
      }
      else {
        z = clone.style.zIndex - 1;
      }
      clone.style.zIndex = String(z);
      return clone;
    });
  }

  /* Handle window switch */
  useEffect(() => {
    if (currentWindow > -1) {
      if (!clones.current) return;
      const currentClone = clones.current[currentWindow];
      const currentImage = cloneImages.current[currentWindow];

      document.body.style.overflow = 'hidden';
      configureScrolling(currentWindow);

      const currentNote = cloneNotes.current[currentWindow];
      if (currentNote) {
        currentNote.style.display = 'block';
        currentNote.classList.remove('reveal-animation', 'disappear-animation');
        currentNote.classList.add('reveal-animation');
        currentNote.scrollTop = 0;
      }
      currentClone.classList.add('light-overlay');

      if (previousWindow.current !== -1) {
        currentClone.style.display = 'block';
        currentClone.style.opacity = '1';
        currentClone.style.pointerEvents = 'auto';
        setZs(currentWindow);
        clones.current[previousWindow.current].classList.remove('light-overlay');
        cloneNotes.current[previousWindow.current].classList.remove('disappear-animation');
        cloneNotes.current[previousWindow.current].classList.add('disappear-animation');

        if (currentWindow > previousWindow.current) {
          gsap.fromTo(currentClone, {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'none',
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
          },
          {
            duration: 1.5,
            ease: 'expo.out',
            xPercent: 0,
            transform: 'none',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          });
          gsap.fromTo(currentImage, {
            xPercent: 0,
            width: '125%',
            height: '100%',
            transform: 'none',
            filter: 'brightness(1)',
          },
          {
            duration: 1.5,
            ease: 'expo.out',
            xPercent: -20,
          });
        }
        else if (currentWindow < previousWindow.current) {
          gsap.fromTo(currentClone, {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'none',
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          },
          {
            duration: 1.5,
            ease: 'expo.out',
            transform: 'none',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          });
          gsap.fromTo(currentImage, {
            xPercent: -20,
            width: '125%',
            height: '100%',
            transform: 'none',
            filter: 'brightness(1)',
          },
          {
            duration: 1.5,
            ease: 'expo.out',
            xPercent: 0,
          });
        }
        else {
          // Do nothing, user reached beginning or end
        }
      }
      else {
        openClone(currentWindow);
      }
    }
    else {
      document.body.style.overflow = 'auto';
    }
  }, [currentWindow]);

  function createClone(originalContainer, index) {
    const cloneContainer = originalContainer.cloneNode(true);
    const cloneImage = cloneContainer.querySelector('.track-image'); 
    
    const cloneNote = cloneContainer.querySelector(".note-content");

    cloneContainer.style.opacity = '0';
    cloneContainer.style.pointerEvents = 'none';
    cloneContainer.style.position = 'fixed';

    cloneContainer.style.zIndex = '40';
    document.getElementById("notes").appendChild(cloneContainer);

    const handleExit = (e, currentIndex) => {
      if (transitionRef.current || isExit.current) {
        return;
      }
      
      
      if ((!(Math.abs(cloneNote.scrollHeight - cloneNote.clientHeight - cloneNote.scrollTop) <= 1 && e.deltaY > 0) && !(cloneNote.scrollTop <= 1 && e.deltaY < 0))) {
        return;
      }


      const originalContainer = originals.current[currentIndex];
      previousWindow.current = -1;
      transitionRef.current = true;
      isExit.current = true;
      
      originalContainer.style.opacity = '0';
      
      previews.current.forEach((preview, i) => {
        preview.classList.remove('show', 'hide');
        preview.style.pointerEvents = 'none';
        if (i === currentIndex) {
          preview.classList.add('hide');
        }
        else {
          preview.style.opacity = '0';
        }
      });
      if (cloneNote) {
        cloneNote.classList.remove('disappear-animation', 'reveal-animation');
        cloneNote.classList.add('disappear-animation');
      }

      clones.current.forEach((clone, index) => {
        const noteInClone = clone.querySelector(".note-content");
        const cloneImage = cloneImages.current[index];
        clone.style.pointerEvents = 'none';
        clone.classList.remove('light-overlay');
        if (noteInClone) {
          noteInClone.style.display = 'none';
        }
        if (cloneContainer != clone) {
          
          const previewRect = previews.current[index].getBoundingClientRect();
          clone.style.opacity = '1';
          clone.style.zIndex = '70';
          
          gsap.set(clone,
            {
              top: `${previewRect.top}px`,
              left: `${previewRect.left}px`,
              width: `${previewRect.width}px`,
              height: `${previewRect.height}px`,
            }
          );
          
          gsap.set(cloneImage,
            {
              width: '100%',
              height: '100%',
              transform: 'none',
              x: 0,
              filter: 'brightness(0.4)'
            }
          );
        }
      });

      const tl = gsap.timeline({paused: true});
      clones.current.forEach((cloneContainer, index) => {
        const originalContainer = originals.current[index];
        const cloneImage = cloneImages.current[index];

        originalContainer.style.opacity = '0';
        cloneContainer.style.opacity = '1';

        const cloneNote = cloneNotes.current[index];
        const originalRect = originalContainer.getBoundingClientRect();
        
        const originalImage = imageRefs.current[index];
        const originalImageRect = originalImage.getBoundingClientRect();
        

        tl.to(cloneContainer, {
          duration: 1,
          ease: 'power4.out',
          width: originalRect.width,
          height: originalRect.height,
          top: originalRect.top,
          left: originalRect.left,
          right: originalRect.right,
          bottom: originalRect.bottom,
          onComplete: () => {
            originalContainer.style.opacity = '1';
          
            if (cloneNote) {
              cloneNote.classList.remove('disappear-animation', 'reveal-animation');
            }

            cloneContainer.style.opacity = '0';
            cloneContainer.style.pointerEvents = 'none';
          }
        }, 0.1 * (Math.abs(currentIndex - index)));
        
        const computedMatrix = getComputedStyle(originalImage).transform;
        
        tl.to(cloneImage, {
          duration: 1,
          ease: 'power4.out',
          transform: computedMatrix,
          width: originalImageRect.width,
          height: originalImageRect.height,
          filter: 'brightness(1)',
        }, 0.1 * (Math.abs(currentIndex - index)));
        
      });
      tl.eventCallback('onComplete', () => {
        transitionRef.current = false;
        previousWindow.current = -1;
        setCurrentWindow(-1);
        tl.kill();
      });
      tl.play();
    };

    cloneContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      if (transitionRef.current) return;

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

    })
    
    cloneContainer.onwheel = (e) => handleExit(e, index);
    
    return cloneContainer;
  }

  function openClone(currentWindow) {
    transitionRef.current = true;
    isExit.current = false;
    const tl = gsap.timeline({paused: true});
    clones.current.forEach((cloneContainer, index) => {
      const originalContainer = originals.current[index];
      const cloneImage = cloneImages.current[index];
      const originalImage = imageRefs.current[index];
      const cloneNote = cloneNotes.current[index];
      const previewContainer = previews.current[index];
      const previewImage = previewImages.current[index];
      previewContainer.classList.remove('show', 'hide');
      const originalRect = originalContainer.getBoundingClientRect();
      const originalImageRect = originalImage.getBoundingClientRect();
      const newRect = previewContainer.getBoundingClientRect();
      const previewImageRect = previewImage.getBoundingClientRect();
      cloneContainer.style.display = 'block';
      cloneContainer.style.opacity = '1';
      originalContainer.style.opacity = '0';
      const computedMatrix = getComputedStyle(originalImage).transform;

      previewContainer.style.opacity = '0';
      previewContainer.style.pointerEvents = 'auto';

      if (index === currentWindow) {
        cloneContainer.style.zIndex = '50';
        cloneContainer.style.pointerEvents = 'auto';
        previewContainer.classList.add('show');
        tl.fromTo(cloneContainer,
          {
            top: `${originalRect.top}px`,
            left: `${originalRect.left}px`,
            width: `${originalRect.width}px`,
            height: `${originalRect.height}px`,
            transform: originalContainer.style.transform,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          {
            duration: 1,
            ease: 'power4.out',
            top: 0,
            left: 0,
            transform: 'none',
            width: '100vw',
            height: '100vh',
            onComplete: () => {
              cloneContainer.classList.add('light-overlay');
              configureScrolling(index);
            }
          },
          0
        );
        tl.fromTo(cloneImage,
          {
            width: originalImageRect.width,
            height: originalImageRect.height,
            transform: computedMatrix,
            filter: 'brightness(1)',
          },
          {
            duration: 1,
            ease: 'power4.out',
            width: '125%',
            height: '100%',
            transform: 'none',
          },
          0
        );
      }
      else {
        cloneContainer.style.pointerEvents = 'none';
        cloneContainer.style.zIndex = '70';
        tl.fromTo(cloneContainer,
          {
            top: `${originalRect.top}px`,
            left: `${originalRect.left}px`,
            width: `${originalRect.width}px`,
            height: `${originalRect.height}px`,
            transform: originalContainer.style.transform,
          },
          {
            duration: 1,
            ease: 'power4.out',
            top: `${newRect.top}px`,
            left: `${newRect.left}px`,
            width: `${newRect.width}px`,
            height: `${newRect.height}px`,
            transform: 'none',
            onComplete: () => {
              cloneContainer.style.opacity = '0';
              cloneContainer.style.zIndex = '49';
              previews.current.forEach((preview) => {
                preview.style.opacity = '1';
              });
            }
          },
          0
        );
        tl.fromTo(cloneImage,
          {
            width: originalImageRect.width,
            height: originalImageRect.height,
            transform: computedMatrix,
            filter: 'brightness(1)'
          },
          {
            duration: 1,
            ease: 'power4.out',
            width: `${previewImageRect.width}px`,
            height: `${previewImageRect.height}px`,
            transform: 'none',
            filter: 'brightness(0.4)',
          },
          0
        );
      }
    });

    tl.eventCallback('onComplete', () => {
      transitionRef.current = false;
      tl.kill();
    });

    tl.play();


  }

  function openWindow(index) {
    if (transitionRef.current) return;

    transitionRef.current = true;

    setCurrentWindow(index);
  }

  const TrackImage = React.forwardRef(({ src, onClick, children }, forwardedRef) => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useImperativeHandle(forwardedRef, () => ({
      container: containerRef.current,
      image: imageRef.current,
    }));

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
    <div id="notes" ref={scrollRef}>
      <div id="program-previews" ref={previewTrack}>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 0;
          })}
          ref={(el) => previews.current[0] = el}
        >
          <img className={`program-preview-image ${currentWindow === 0 ? "active" : ""}`} src={sky} ref={(el) => previewImages.current[0] = el}/>
        </div>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 1;
          })}
          ref={(el) => previews.current[1] = el}
        >
          <img className={`program-preview-image ${currentWindow === 1 ? "active" : ""}`} src={flower} ref={(el) => previewImages.current[1] = el}/>
        </div>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 2;
          })}
          ref={(el) => previews.current[2] = el}
        >
          <img className={`program-preview-image ${currentWindow === 2 ? "active" : ""}`} src={stage} ref={(el) => previewImages.current[2] = el}/>
        </div>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 3;
          })}
          ref={(el) => previews.current[3] = el}
        >
          <img className={`program-preview-image ${currentWindow === 3 ? "active" : ""}`} src={book} ref={(el) => previewImages.current[3] = el}/>
        </div>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 4;
          })}
          ref={(el) => previews.current[4] = el}
        >
          <img className={`program-preview-image ${currentWindow === 4 ? "active" : ""}`} src={sheetmusic} ref={(el) => previewImages.current[4] = el}/>
        </div>
        <div 
          className="program-preview" 
          onClick={() => setCurrentWindow(prevWindow => {
            previousWindow.current = prevWindow;
            return 5;
          })}
          ref={(el) => previews.current[5] = el}
        >
          <img className={`program-preview-image ${currentWindow === 5 ? "active" : ""}`} src={sky} ref={(el) => previewImages.current[5] = el}/>
        </div>
      </div>
      <div className="program-track-container">
        <div className="program-track" ref={trackRef}>
          <TrackImage
            src={sky}
            ref={(el) => {
              if (el) {
                originals.current[0] = el.container;
                imageRefs.current[0] = el.image;
              }
            }}
            onClick={() => openWindow(0)}
          >
            <div className="note-content">
              <section className="about">
                <img src={portrait} className="about-portrait"/>
                <div className="about-text">
                  <h1>ABOUT<br/>THE ARTIST</h1>          
                  <div className="about-bio">
                    <hr className="note-line"/>
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
                  </div>
                </div>
              </section>
            </div>
          </TrackImage>
          <TrackImage
            src={flower}
            ref={(el) => {
              if (el) {
                originals.current[1] = el.container;
                imageRefs.current[1] = el.image;
              }
            }}
            onClick={() => openWindow(1)}
          >
            <div className="note-content">
              <div className="note-wrapper">
                <div className="program-scroll">
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
              </div>
            </div>
          </TrackImage>
          <TrackImage
            src={stage}
            ref={(el) => {
              if (el) {
                originals.current[2] = el.container;
                imageRefs.current[2] = el.image;
              }
            }}
            onClick={() => openWindow(2)}
          >
            <div className="note-content">
              <div className="note-wrapper">
                <div className="note">
                  <h2>Op. 1</h2>
                  <div className="program-note-text">
                    <hr className="note-line"/>
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
              </div>
            </div>
          </TrackImage>
          <TrackImage
            src={book}
            ref={(el) => {
              if (el) {
                originals.current[3] = el.container;
                imageRefs.current[3] = el.image;
              }
            }}
            onClick={() => openWindow(3)}
          >
            <div className="note-content">
              <div className="note-wrapper">
                <div className="note">
                  <h2>Op. 2</h2>
                  <div className="program-note-text">
                    <hr className="note-line"/>
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
              </div>
            </div>
          </TrackImage>
          <TrackImage
            src={sheetmusic}
            ref={(el) => {
              if (el) {
                originals.current[4] = el.container;
                imageRefs.current[4] = el.image;
              }
            }}
            onClick={() => openWindow(4)}
          >
            <div className="note-content">
              <div className="note-wrapper">
                <div className="note">
                  <h2>Op. 3</h2>
                  <div className="program-note-text">
                    <hr className="note-line"/>
                    <p>
                      <br/>
                      <b>Select Repertoire Library</b><br/><br/>
                      This is a library of themed playlists I curate. If you don't like reading or don't care for my posts (I'm only a little offended), this is a perfect place to get straight to the music.
                      There’s so much music out there that doesn’t always get the recognition it deserves.
                      <br/><br/>
                      At your own leisure, give these playlists a listen. I hope you'll find music that you like and add it to your own playlists.
                      I can confidently say the music here is beyond phenomenal. After all, I approved and curated it myself!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TrackImage>
          <TrackImage
            src={sky}
            ref={(el) => {
              if (el) {
                originals.current[5] = el.container;
                imageRefs.current[5] = el.image;
              }
            }}
            onClick={() => openWindow(5)}
          >
            <div className="note-content">
              <div className="note-wrapper">
                <div className="note">
                  <h2>Op. 4</h2>
                  <div className="program-note-text">
                    <hr className="note-line"/>
                    <p>
                      <br/>
                      <b>A Postlude</b><br/><br/>
                      A concluding "postlude" to this website. Here, I share a bit more about the website itself.
                      It was a blast to build, and I’m excited to share some of the underlying design details as well as the goals and motivations behind it.
                      <br/><br/>
                      Then I wrap up with acknowledgements and credits for the resources that made this website possible.
                      Just like a musical performance, there are countless people and processes behind the scenes that make a show truly memorable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TrackImage>
        </div>      
      </div>
    </div>
  );
});

export default Notes;