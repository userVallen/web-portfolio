import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import styles from "./ThemeToggle.module.css";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

export default function ThemeToggle({ theme, setTheme, mobileView }) {
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const toggleRef = useRef(null);

  const handleHover = (el) => {
    gsap.to(el, { scale: 1.2, duration: 0.05, ease: "none" });
  };

  const handleLeave = (el) => {
    gsap.to(el, { scale: 1, duration: 0.05, ease: "none" });
  };

  useEffect(() => {
    gsap.to(moonRef.current, {
      morphSVG: theme === "light" ? moonRef.current : sunRef.current,
      fill: theme === "light" ? "#000" : "#fff",
      duration: 0.5,
      ease: "expo.inOut",
    });
  }, [theme]);

  useEffect(() => {
    let bgColor = "";
    if (!mobileView) bgColor = "transparent";
    else bgColor = theme === "light" ? "#fff" : "#000";

    gsap.to(toggleRef.current, {
      backgroundColor: bgColor,
      duration: 0.3,
      ease: "expo.out",
    });
  }, [mobileView, theme]);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.toggle} ref={toggleRef} onClick={toggleTheme}>
        <svg
          viewBox="0 0 256 256"
          alt="moon icon"
          onMouseEnter={(e) => handleHover(e.currentTarget)}
          onMouseLeave={(e) => handleLeave(e.currentTarget)}
        >
          <defs>
            <path
              ref={sunRef}
              d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"
            />
          </defs>
          <path
            ref={moonRef}
            d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"
          />
        </svg>
      </button>
    </div>
  );
}
