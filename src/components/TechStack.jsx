import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TechStack.module.css";
import { techIcons } from "../assets/techIcons";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const icons = [
    {
      link: "https://react.dev/",
      icon: techIcons.react,
      label: "React.js",
    },
    {
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: techIcons.javascript,
      label: "JavaScript",
    },
    {
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: techIcons.html,
      label: "HTML",
    },
    {
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: techIcons.css,
      label: "CSS",
    },
    {
      link: "https://getbootstrap.com/",
      icon: techIcons.bootstrap,
      label: "Bootstrap",
    },
    {
      link: "https://gsap.com/",
      icon: techIcons.gsap,
      label: "GSAP",
    },
    {
      link: "https://nodejs.org/en",
      icon: techIcons.node,
      label: "Node.js",
    },
    {
      link: "https://expressjs.com/",
      icon: techIcons.express,
      label: "Express.js",
    },
    {
      link: "https://axios-http.com/",
      icon: techIcons.axios,
      label: "Axios",
    },
    {
      link: "https://www.postman.com/",
      icon: techIcons.postman,
      label: "Postman",
    },
    {
      link: "https://www.figma.com/",
      icon: techIcons.figma,
      label: "Figma",
    },
    { link: "https://git-scm.com/", icon: techIcons.git, label: "Git" },
    {
      link: "https://github.com/",
      icon: techIcons.github,
      label: "GitHub",
    },
    {
      link: "https://www.c-language.org/",
      icon: techIcons.c,
      label: "C",
    },
    { link: "https://isocpp.org/", icon: techIcons.cpp, label: "C++" },
    {
      link: "https://www.python.org/",
      icon: techIcons.python,
      label: "Python",
    },
    {
      link: "https://www.postgresql.org/",
      icon: techIcons.postgresql,
      label: "PostgreSQL",
    },
    {
      link: "https://aws.amazon.com",
      icon: techIcons.aws,
      label: "AWS",
    },
  ];

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const lineRef = useRef(null);
  const parRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.from(headRef.current, {
        opacity: 0,
        y: 60,
        ease: "power2.out",
      })
        .from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "power2.out",
        })
        .from(parRef.current, {
          opacity: 0,
          y: 60,
          ease: "power2.out",
        })
        .from(trackRef.current, {
          opacity: 0,
          y: 60,
          ease: "power3.out",
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        // markers: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className={styles.sectionContainer} ref={sectionRef}>
      <h2 ref={headRef}>What I Use</h2>

      <div className={`my-4 ${styles.divider}`} ref={lineRef}></div>

      <p className="text-center" ref={parRef}>
        Throughout my studies, I've gained hands-on experience with a wide range
        of languages, frameworks, and tools, applying them to personal projects
        to deliver well-crafted, real-world solutions.
      </p>

      <div className={styles.techTrackContainer} ref={trackRef}>
        <div className={styles.techTrack}>
          {[...icons, ...icons].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              label={item.label}
            >
              <img
                src={item.icon}
                alt="tech icon"
                className={styles.techIcon}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
