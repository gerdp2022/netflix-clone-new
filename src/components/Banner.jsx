import { useEffect, useState } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import axios, { TMDB_API_KEY, BANNER_BASE } from "../api/axios";
import requests from "../api/requests";
import bannerFallback from "../assets/image/banner.jpeg";
import styles from "./Banner.module.css";

const FALLBACK = {
  id: 1,
  title: "Monarch: Legacy of Monsters",
  overview:
    "Follow one family's journey, both from the past and in the present day, in the aftermath of the 2014 battle between Godzilla and the M.U.T.O. that leveled San Francisco and revealed the existence of monsters to the world.",
  image: bannerFallback,
  poster_path: bannerFallback,
  previewVideo: "/previews/1.mp4",
  matureRating: "U/A 16+",
  category: "Series",
  genres: ["Action", "Thriller", "Adventure"],
};

export default function Banner({ onPlay }) {
  const [content, setContent] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    async function fetchBanner() {
      if (!TMDB_API_KEY) return; // no key configured, keep local fallback
      try {
        const res = await axios.get(requests.fetchNetflixOriginals);
        const results = res.data?.results || [];
        if (!results.length || cancelled) return;
        const pick = results[Math.floor(Math.random() * results.length)];
        setContent({
          ...FALLBACK, // keep a playable previewVideo/poster/rating even though TMDB has none
          id: pick.id,
          title: pick.name || pick.title,
          overview: pick.overview,
          image: pick.backdrop_path ? `${BANNER_BASE}${pick.backdrop_path}` : bannerFallback,
        });
      } catch (err) {
        // API key missing/invalid or network blocked -> stay on local fallback
        console.warn("Banner fetch failed, using local fallback:", err.message);
      }
    }

    fetchBanner();
    return () => {
      cancelled = true;
    };
  }, []);

  const truncate = (str, n) => (str && str.length > n ? `${str.slice(0, n)}…` : str);

  return (
    <section
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(20,20,20,0.15) 0%, rgba(20,20,20,0.3) 60%, #141414 100%), url(${content.image})`,
      }}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.overview}>{truncate(content.overview, 170)}</p>

        <div className={styles.buttons}>
          <button
            className={styles.playBtn}
            onClick={() => content.previewVideo && onPlay?.(content)}
            disabled={!content.previewVideo}
          >
            <FaPlay /> Play
          </button>
          <button className={styles.infoBtn}>
            <FaInfoCircle /> More Info
          </button>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}
