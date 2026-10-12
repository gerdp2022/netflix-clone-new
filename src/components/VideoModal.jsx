import { useEffect, useRef, useState } from "react";
import { FaTimes, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import styles from "./VideoModal.module.css";

export default function VideoModal({ movie, onClose }) {
  const videoRef = useRef(null);
  // Start muted: browsers require autoplaying media to be muted. Once the
  // modal is open, this is a user gesture (they clicked to open it), so we
  // can safely unmute immediately after — real audio will now play as long
  // as the source file actually has an audio track.
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Belt-and-braces: explicitly call play() once the source is ready, in
  // case the autoPlay attribute alone gets ignored by the browser.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !movie) return;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay);
    return () => video.removeEventListener("loadedmetadata", tryPlay);
  }, [movie]);

  // Reset to muted-autoplay whenever a new movie is opened.
  useEffect(() => {
    setMuted(true);
  }, [movie]);

  // Unmute shortly after opening, since the modal only ever mounts as a
  // direct result of the user clicking a card — that click counts as the
  // user gesture browsers require before allowing audio.
  useEffect(() => {
    if (!movie) return;
    const t = setTimeout(() => setMuted(false), 400);
    return () => clearTimeout(t);
  }, [movie]);

  if (!movie) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.player} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close player">
          <FaTimes />
        </button>

        <video
          ref={videoRef}
          className={styles.video}
          src={movie.previewVideo}
          poster={movie.poster_path}
          autoPlay
          controls
          loop
          playsInline
          muted={muted}
        />

        <button
          className={styles.muteBtn}
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <div className={styles.footer}>
          <h2>{movie.title}</h2>
          <p>
            {movie.matureRating && <span>{movie.matureRating}</span>}
            {movie.category && <span> • {movie.category}</span>}
            {movie.genres?.length ? <span> • {movie.genres.join(", ")}</span> : null}
          </p>
        </div>
      </div>
    </div>
  );
}
