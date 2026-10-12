import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPlus, FaCheck, FaChevronDown, FaThumbsUp } from "react-icons/fa";
import { useMyList } from "../context/MyListContext";
import styles from "./Card.module.css";

const HOVER_DELAY = 500; // ms — Netflix waits ~0.5-1s before starting preview playback

export default function Card({ movie, onPlay }) {
  const { toggle, isInList } = useMyList();
  const inList = isInList(movie);
  const [hovering, setHovering] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (hovering) {
      timerRef.current = setTimeout(() => setPreviewReady(true), HOVER_DELAY);
    } else {
      clearTimeout(timerRef.current);
      setPreviewReady(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [hovering]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewReady) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [previewReady]);

  const handlePlay = (e) => {
    e.stopPropagation();
    onPlay?.(movie);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img src={movie.poster_path} alt={movie.title} className={styles.poster} loading="lazy" />

      {movie.badge && <span className={styles.badge}>{movie.badge}</span>}

      <div className={`${styles.overlay} ${hovering ? styles.overlayActive : ""}`}>
        <div className={styles.thumbWrap} onClick={handlePlay}>
          {movie.previewVideo ? (
            <>
              <img
                src={movie.poster_path}
                alt={movie.title}
                className={`${styles.thumb} ${previewReady ? styles.thumbHidden : ""}`}
              />
              <video
                ref={videoRef}
                className={`${styles.thumb} ${styles.thumbVideo} ${previewReady ? styles.thumbVisible : ""}`}
                src={movie.previewVideo}
                muted
                loop
                playsInline
                preload="none"
              />
            </>
          ) : (
            <img src={movie.poster_path} alt={movie.title} className={styles.thumb} />
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.actionRow}>
            <button className={styles.circleBtn} title="Play" onClick={handlePlay}>
              <FaPlay />
            </button>
            <button
              className={styles.circleBtn}
              title={inList ? "Remove from My List" : "Add to My List"}
              onClick={(e) => {
                e.stopPropagation();
                toggle(movie);
              }}
            >
              {inList ? <FaCheck /> : <FaPlus />}
            </button>
            <button className={styles.circleBtn} title="Rate" onClick={(e) => e.stopPropagation()}>
              <FaThumbsUp />
            </button>
            <button
              className={`${styles.circleBtn} ${styles.chevronBtn}`}
              title="More info"
              onClick={(e) => e.stopPropagation()}
            >
              <FaChevronDown />
            </button>
          </div>

          <p className={styles.metaLine}>
            <span className={styles.rating}>{movie.matureRating}</span>
            <span className={styles.dot}>•</span>
            <span>{movie.category}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.hd}>{movie.quality}</span>
          </p>

          <p className={styles.genres}>{movie.genres?.join(" • ")}</p>
        </div>
      </div>
    </div>
  );
}
