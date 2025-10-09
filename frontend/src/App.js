import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RevealSection from "./components/RevealSection/RevealSection"


function App() {

  return (
    <div className="app">
      <Navbar/>
      <section className="home-content">
        <div class="keys">
          <RevealSection delay={0.5} direction="up">
            <div className="c-key">
              <svg class="c-key-border white-key-animations" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="var(--color-gray)" flood-opacity="0.25"/>
                </filter>
                <filter id="shadow-hover">
                  <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--color-gray)" flood-opacity="0.5"/>
                </filter>
                <polygon
                  points="0 0, 6 0, 6 31.2, 20 31.2, 20 60, 0 60"
                  fill="var(--color-ivory)"
                  stroke="var(--color-gray)"
                  stroke-width="0.05"
                  filter="url(#shadow)"
                />
              </svg>
            </div>
          </RevealSection>
          
          <RevealSection delay={1.5} direction="up">
            <div className="d-key">
              <svg class="d-key-border white-key-animations" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="var(--color-gray)" flood-opacity="0.25"/>
                </filter>
                <filter id="shadow-hover">
                  <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--color-gray)" flood-opacity="0.5"/>
                </filter>
                <polygon
                  points="7 0, 13 0, 13 31.2, 20 31.2, 20 60, 0 60, 0 31.2, 7 31.2"
                  fill="var(--color-ivory)"
                  stroke="var(--color-gray)"
                  stroke-width="0.05"
                  filter="url(#shadow)"
                />
              </svg>
            </div>
          </RevealSection>

          <RevealSection delay={2.5} direction="up">
            <div className="e-key">
              <svg class="e-key-border white-key-animations" viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="var(--color-gray)" flood-opacity="0.25"/>
                </filter>
                <filter id="shadow-hover">
                  <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--color-gray)" flood-opacity="0.5"/>
                </filter>
                <polygon
                  points="0 31.2, 14 31.2, 14 0, 20 0, 20 31.2, 20 60, 0 60"
                  fill="var(--color-ivory)"
                  stroke="var(--color-gray)"
                  stroke-width="0.05"
                  filter="url(#shadow)"
                />
              </svg>
            </div>
          </RevealSection>

          <RevealSection delay={1} direction="down">
            <div className="c-sharp">
              <div class="c-sharp-container black-key-animations">

              </div>
            </div>
          </RevealSection>

          <RevealSection delay={2} direction="down">
            <div className="e-flat">
              <div className="e-flat-container black-key-animations">

              </div>
            </div>
          </RevealSection>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}

export default App;
