import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Breadcrumb from "./Breadcrumb";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Navbar({
  aboutRef,
  techStackRef,
  projectsRef,
  mobileView,
}) {
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef(null);

  const scrollToSection = (ref) => {
    gsap.to(window, {
      duration: 0.1,
      scrollTo: ref.current,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    if (!mobileView) setOpen(false);
  }, [mobileView]);

  useEffect(() => {
    if (!mobileNavRef.current) return;

    gsap.killTweensOf(mobileNavRef.current);

    gsap.to(mobileNavRef.current, {
      height: open || !mobileView ? "auto" : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [open, mobileView]);

  return (
    <nav className={styles.navbar}>
      <Breadcrumb />

      <button
        className={styles.navButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
        </svg>
      </button>

      <div
        className={`${mobileView ? styles.mobileNav : styles.navLinks}`}
        ref={mobileNavRef}
      >
        <button
          className={`${open ? styles.mobileNavLink : styles.navLink}`}
          onClick={() => scrollToSection(aboutRef)}
        >
          ABOUT
        </button>
        <button
          className={`${open ? styles.mobileNavLink : styles.navLink}`}
          onClick={() => scrollToSection(techStackRef)}
        >
          SKILLS
        </button>
        <button
          className={`${open ? styles.mobileNavLink : styles.navLink}`}
          onClick={() => scrollToSection(projectsRef)}
        >
          PROJECTS
        </button>
      </div>
    </nav>
  );
}
