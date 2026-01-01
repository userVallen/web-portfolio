import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./ContactMe.module.css";

gsap.registerPlugin(useGSAP);

export default function ContactMe({ mobileView }) {
  const [hover, setHover] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const svgRef = useRef(null);

  useGSAP(() => {
    if (!mobileView) {
      gsap.to(svgRef.current, {
        width: hover ? "16px" : "0",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hover]);

  async function handleSend(e) {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      console.log("Response body is: ", res.body);
      alert("Message sent!");
      e.target.reset();
    } catch (err) {
      alert("Something went wrong!");
    }

    setIsSending(false);
  }
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.textContainer}>
        <h2>Contact Me</h2>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSend}>
          {/* Honeypot field */}
          <input
            type="text"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            style={{ display: "none" }}
          />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSending}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {isSending ? (
              "Sending..."
            ) : (
              <>
                Send
                <svg viewBox="0 0 256 256" ref={svgRef}>
                  <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
