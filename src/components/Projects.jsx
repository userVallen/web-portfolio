import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kamoosThumbnail from "../assets/kamoos.png";
import bloggoThumbnail from "../assets/bloggo.png";
import daylyThumbnail from "../assets/dayly.png";
import otpThumbnail from "../assets/otp.png";

gsap.registerPlugin(ScrollTrigger);
import Card from "./Card";
import styles from "./Projects.module.css";

export default function Projects({ mobileView }) {
  const projects = [
    {
      thumbnail: kamoosThumbnail,
      title: "kamoos",
      skills: ["React", "JavaScript"],
      desc: "A lightweight English dictionary web app that provides detailed definitions and pronunciation audio by fetching real-time data from an external dictionary API.",
      demoLink: "https://kamoos.onrender.com/",
      repoLink: "https://github.com/userVallen/kamoos",
    },
    {
      thumbnail: bloggoThumbnail,
      title: "Bloggo",
      skills: ["Node", "Express", "Bootstrap", "JavaScript", "EJS"],
      desc: "A minimal blog platform showcasing server-side rendering, route handling, and CRUD logic using Express.js and EJS.",
      demoLink: "https://bloggo-rlpz.onrender.com/",
      repoLink: "https://github.com/userVallen/Bloggo",
    },
    {
      thumbnail: daylyThumbnail,
      title: "Dayly",
      skills: ["React", "Node", "Express", "Axios", "Bootstrap", "JavaScript"],
      desc: "A minimalist weather web app that retrieves real-time weather conditions and short term forecasts from the Open-Meteo API based on user-provided coordinates.",
      demoLink: "https://dayly.onrender.com/",
      repoLink: "https://github.com/userVallen/Dayly",
    },
    {
      thumbnail: otpThumbnail,
      title: "OpenAuth",
      skills: ["Python", "Flask", "MongoDB"],
      desc: "A Python-based OTP generation and verification system designed for simple and securely encrypted authentication.",
      repoLink: "https://github.com/userVallen/OpenAuth-user-server",
    },
  ];

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(gridRef);
      const cards = q(`[data-gsap="card"]`);

      if (!mobileView) {
        gsap.from(headRef.current, {
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 80%",
            end: "bottom center",
            scrub: true,
            // markers: true,
          },
          opacity: 0,
          y: 40,
          ease: "power2.out",
        });

        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "90% bottom",
            scrub: true,
            // markers: true,
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          ease: "power2.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <div className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.headerContainer} ref={headRef}>
        <h2>My Projects</h2>
      </div>
      <div className={styles.projectContainer} ref={gridRef}>
        {projects.map((item, i) => (
          <Card
            key={i}
            thumbnail={item.thumbnail}
            title={item.title}
            skills={item.skills}
            desc={item.desc}
            demoLink={item.demoLink}
            repoLink={item.repoLink}
            dataGsap="card"
          />
        ))}
      </div>
    </div>
  );
}
