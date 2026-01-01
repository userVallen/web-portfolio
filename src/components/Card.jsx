import styles from "./Card.module.css";

export default function Card({
  thumbnail,
  title,
  skills,
  desc,
  demoLink,
  repoLink,
  dataGsap,
}) {
  return (
    <div className={styles.cardContainer} data-gsap={dataGsap}>
      <img className={styles.thumbnail} src={thumbnail} alt="" />

      <div className="d-flex flex-column mx-1">
        <h3 className="my-2">{title}</h3>

        <p>{desc}</p>

        <div className={styles.skillsContainer}>
          {skills.map((item, i) => (
            <div key={i} className={styles.pill}>
              {item}
            </div>
          ))}
        </div>

        <div className="d-inline-block">
          {demoLink && (
            <div className="d-inline-block">
              <a
                className={styles.viewButton}
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.viewIcon}
                  fill="var(--font-color)"
                  viewBox="0 0 256 256"
                  alt="view icon"
                >
                  <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                </svg>
              </a>
            </div>
          )}

          {repoLink && (
            <div className="d-inline-block">
              <a
                className={styles.viewButton}
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.viewIcon}
                  fill="var(--font-color)"
                  viewBox="0 0 256 256"
                  alt="view icon"
                >
                  <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
