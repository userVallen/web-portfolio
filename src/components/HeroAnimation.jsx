import { useRef } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./HeroAnimation.module.css";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

export default function ({ svgRef }) {
  const walkerRef = useRef(null);
  const morphInitRef1 = useRef(null);
  const morphInitRef2 = useRef(null);
  const morphShapeRef1 = useRef(null);
  const morphShapeRef2 = useRef(null);

  const stretch = (direction, dist, duration) => {
    let newValues = {};

    if (direction === "right" || direction === "left") {
      Object.assign(newValues, { width: `+=${dist}` });
      if (direction === "left") {
        Object.assign(newValues, { x: `-=${dist}` });
      }
    } else if (direction === "up" || direction === "down") {
      Object.assign(newValues, { height: `+=${dist}` });
      if (direction === "up") {
        Object.assign(newValues, { y: `-=${dist}` });
      }
    }

    return gsap.to(walkerRef.current, {
      ...newValues,
      duration: duration,
      ease: "power2.out",
    });
  };

  const retract = (direction, dist, duration) => {
    let newValues = {};

    if (direction === "right" || direction === "left") {
      Object.assign(newValues, { width: `-=${dist}` });
      if (direction === "right") {
        Object.assign(newValues, { x: `+=${dist}` });
      }
    } else if (direction === "up" || direction === "down") {
      Object.assign(newValues, { height: `-=${dist}` });
      if (direction === "down") {
        Object.assign(newValues, { y: `+=${dist}` });
      }
    }

    return gsap.to(walkerRef.current, {
      ...newValues,
      duration: duration,
      ease: "power2.out",
    });
  };

  const move = (direction, dist, duration) => {
    let newValues = {};

    switch (direction) {
      case "up":
        Object.assign(newValues, { y: `-=${dist}` });
        break;
      case "down":
        Object.assign(newValues, { y: `+=${dist}` });
        break;
      case "left":
        Object.assign(newValues, { x: `-=${dist}` });
        break;
      case "right":
        Object.assign(newValues, { x: `+=${dist}` });
        break;
      default:
        break;
    }

    return gsap.to(walkerRef.current, {
      ...newValues,
      duration: duration,
      ease: "power2.out",
    });
  };

  const morph = (source, target) => {
    return gsap.to(source, {
      duration: 1,
      morphSVG: target,
      ease: "expo.inOut",
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 1 });

    tl.add(move("right", 100, 0.8))
      .add(move("down", 100, 0.5), ">1")
      .add(stretch("right", 100, 0.8))
      .add(retract("right", 100, 0.2), ">1")
      .add(move("up", 100, 0.5))
      .add(stretch("right", 100, 0.8))
      .add(morph(morphInitRef1.current, morphShapeRef1.current), ">-1")
      .add(retract("right", 100, 0.2), "<2")
      .add(stretch("down", 100, 0.5))
      .add(retract("down", 100, 0.8))
      .add(move("right", 100, 0.5), ">1")
      .add(stretch("down", 100, 0.8))
      .add(retract("down", 100, 0.2), ">1")
      .add(move("down", 100, 0.3))
      .add(move("left", 200, 0.5))
      .add(stretch("right", 200, 0.8))
      .add(morph(morphInitRef2.current, morphShapeRef2.current), "<-0.2")
      .add(stretch("left", 100, 0.3), ">1")
      .add(retract("left", 300, 0.3))
      .add(move("up", 100, 0.5))
      .add(move("left", 100, 0.5))
      .add(morph(morphInitRef2.current, morphInitRef2.current), "-=0.75")
      .add(morph(morphInitRef1.current, morphInitRef1.current), "-=0.5");
  }, []);

  return (
    <svg
      className="mw-100"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      ref={svgRef}
    >
      <defs>
        <circle id="base-circle" r="50" />
        <rect id="base-rect" rx="50" width="200" height="100" />
        <rect id="long-rect" rx="50" width="300" height="100" />
        <rect id="tall-rect" rx="50" width="100" height="200" />
        <linearGradient
          id="linear-gradient"
          gradientTransform="rotate(45 .5 .5)"
        >
          <stop offset="0" stopColor="var(--gradient-start)" />
          <stop offset="1" stopColor="var(--gradient-end)" />
        </linearGradient>
        <clipPath id="track-mask">
          <use href="#base-circle" x="50" y="50" />
          <use href="#base-rect" x="100" y="0" />
          <use href="#base-rect" x="0" y="100" />
          <use href="#base-circle" x="250" y="150" />
          <use href="#tall-rect" x="300" y="100" />
          <use href="#long-rect" x="100" y="300" />
          <use href="#base-circle" x="50" y="350" />
          <use href="#base-circle" x="50" y="250" />
        </clipPath>
        <path
          ref={morphShapeRef1}
          d="M 300 0 L 400 0 L 400 100 L 300 100 Z"
          fill="url(#linear-gradient)"
        />
        <path
          ref={morphShapeRef2}
          d="M 200 250 A 50 50 0 1 1 100 250 A 50 50 0 1 1 200 250 Z M 300 250 A 50 50 0 1 1 200 250 A 50 50 0 1 1 300 250 Z"
          fill="url(#linear-gradient)"
        />
      </defs>
      // * UI/UX circle
      <use
        href="#base-circle"
        x="50"
        y="50"
        fill="var(--animation-base-color)"
      />
      // * Deployment rectangle
      <use href="#base-rect" x="100" y="0" fill="var(--animation-base-color)" />
      // ! Top right obstacle
      <path
        d="M 400 50 A 50 50 0 0 1 300 50 A 50 50 0 0 1 400 50 Z"
        fill="url(#linear-gradient)"
        ref={morphInitRef1}
      />
      // * Security rectangle
      <use href="#base-rect" x="0" y="100" fill="var(--animation-base-color)" />
      // * API circle
      <use
        href="#base-circle"
        x="250"
        y="150"
        fill="var(--animation-base-color)"
      />
      // * Data handling rectangle
      <use
        href="#tall-rect"
        x="300"
        y="100"
        fill="var(--animation-base-color)"
      />
      // ! Free circle (above)
      <use
        href="#base-circle"
        x="50"
        y="250"
        fill="var(--animation-base-color)"
      />
      // ! Center obstacles
      <circle cx="150" cy="250" fill="red"></circle>
      <circle cx="250" cy="250" fill="red"></circle>
      <path
        d="M 100 250 A 50 50 0 0 1 150 200 H 250 A 50 50 0 0 1 300 250 A 50 50 0 0 1 250 300 H 150 A 50 50 0 0 1 100 250 Z"
        fill="url(#linear-gradient)"
        ref={morphInitRef2}
      />
      // ! Free circle (below)
      <use
        href="#base-circle"
        x="50"
        y="350"
        fill="var(--animation-base-color)"
      />
      // * Any rectangle
      <use
        href="#long-rect"
        width="300"
        x="100"
        y="300"
        fill="var(--animation-base-color)"
      />
      // * Walker rectangle
      <g clipPath="url(#track-mask)">
        <rect
          width="100"
          height="100"
          x="-100"
          y="0"
          fill="url(#linear-gradient)"
          rx="50"
          ref={walkerRef}
        />
      </g>
      // * Texts
      <text x="50" y="50" className={styles.textStyle}>
        UI/UX
      </text>
      <text x="200" y="50" className={styles.textStyle}>
        Deployment
      </text>
      <text x="100" y="150" className={styles.textStyle}>
        Security
      </text>
      <text x="250" y="150" className={styles.textStyle}>
        APIs
      </text>
      <text x="350" y="200" dy="-0.5em" className={styles.textStyle}>
        Data
        <tspan x="350" dy="1.2em">
          Handling
        </tspan>
      </text>
      <text x="250" y="350" className={styles.textStyle}>
        Anything your website needs!
      </text>
    </svg>
  );
}
