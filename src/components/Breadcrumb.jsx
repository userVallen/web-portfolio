import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Breadcrumb.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Breadcrumb() {
  const [currentSection, setCurrentSection] = useState("");
  const breadcrumbRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray("#app-sections section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(section.id),
        onEnterBack: () => setCurrentSection(section.id),
      });
    });
  }, [currentSection]);

  return (
    <div className={styles.sectionContainer}>
      Users/Vallen/<span ref={breadcrumbRef}>{`${currentSection}`}</span>
    </div>
  );
}
