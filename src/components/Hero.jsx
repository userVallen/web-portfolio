import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroAnimation from "./HeroAnimation";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(
    () => {
      const highlights = gsap.utils.toArray(".highlight-bg");
      const tl = gsap.timeline({ paused: true });

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
        },
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 40%",
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: () => tl.reverse(),
        })
      );

      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "80% center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        x: -200,
        opacity: 0,
        ease: "none",
      });

      gsap.to(svgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "80% center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        x: 200,
        opacity: 0,
        ease: "none",
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.textContainer} ref={textRef}>
        <h1 className="mt-5">
          Hi, I'm <span className={styles.emphasize}>Vallen</span>!
        </h1>
        <p className="w-100 my-4">
          A web developer focused on creating clean and thoughtful{" "}
          <span className="highlight">
            <span className="highlight-bg" />
            <span className="highlight-text">interfaces</span>
          </span>
          . I enjoy building projects that make everyday tasks{" "}
          <span className="highlight">
            <span className="highlight-bg" />
            <span className="highlight-text">easier</span>
          </span>
          , from small{" "}
          <span className="highlight">
            <span className="highlight-bg" />
            <span className="highlight-text">web tools</span>
          </span>{" "}
          to interactive experiences.
        </p>
      </div>

      <div className={styles.svgContainer}>
        <HeroAnimation svgRef={svgRef} />
      </div>
    </div>
  );
}
