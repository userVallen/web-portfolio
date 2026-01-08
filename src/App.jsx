import { useState, useRef, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Contacts from "./components/Contacts";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

function App() {
  const MOBILE_BREAKPOINT = 576;
  const [mobileView, setMobileView] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [theme, setTheme] = useState("light");
  const aboutRef = useRef(null);
  const techStackRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= MOBILE_BREAKPOINT
        ? setMobileView(false)
        : setMobileView(true);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="app-sections">
        <Navbar
          aboutRef={aboutRef}
          techStackRef={techStackRef}
          projectsRef={projectsRef}
          mobileView={mobileView}
        />
        <ThemeToggle
          theme={theme}
          setTheme={setTheme}
          mobileView={mobileView}
        />
        <Contacts mobileView={mobileView} />

        <div className="content">
          <section>
            <Hero />
          </section>

          <section ref={aboutRef} id="About">
            <About />
          </section>

          <section ref={techStackRef} id="Skills">
            <TechStack />
          </section>

          <section ref={projectsRef} id="Projects">
            <Projects mobileView={mobileView} />
          </section>

          <section ref={contactRef} id="Contact" style={{ minHeight: "unset" }}>
            <ContactMe mobileView={mobileView} />
          </section>

          <Footer />
        </div>
      </div>

      <Analytics />
    </>
  );
}

export default App;
