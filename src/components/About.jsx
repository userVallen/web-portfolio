import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import profileImg from "../assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const parRef = useRef(null);

  useGSAP(
    () => {
      const highlights = gsap.utils.toArray(".highlight-bg");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: () => tl.reverse(),
        },
      });

      tl.fromTo(
        highlights,
        {
          transform: "scaleX(0)",
          transformOrigin: "left center",
        },
        {
          transform: "scaleX(1)",
          duration: 0.6,
          ease: "power2.out",
        }
      );
    },
    { scope: parRef }
  );

  return (
    <div className={`row g-4 ${styles.sectionContainer}`} ref={sectionRef}>
      <h2 className="w-auto" ref={headRef}>
        About Me
      </h2>
      <div className={styles.container}>
        <div className={styles.paragraphContainer} ref={parRef}>
          <p style={{ zIndex: "100" }}>
            I’m a final-year Mobile System Engineering student at Dankook
            University expecting to graduate by the beginning of 2026. Aside
            from providing helpful services, I’m deeply passionate about
            creating{" "}
            <span className="highlight">
              <span className="highlight-bg" />
              <span className="highlight-text">modern interfaces</span>
            </span>{" "}
            with smooth,{" "}
            <span className="highlight">
              <span className="highlight-bg" />
              <span className="highlight-text">meaningful animations</span>
            </span>
            . I love turning simple scroll interactions into dynamic,
            story-driven experiences.
          </p>
          <p>
            Outside of coding, I often find myself inspired by visually pleasing
            art and designs, which I oftentimes translate into my own projects,
            experimenting with styles, frameworks, and languages to better
            understand their strengths.
          </p>
        </div>

        <img src={profileImg} alt="profile image" loading="lazy" />
      </div>
    </div>
  );
}
