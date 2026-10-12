import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import axios, { TMDB_API_KEY, IMAGE_BASE } from "../api/axios";
import Card from "./Card";
import styles from "./Row.module.css";

// Adapts a raw TMDB result into the shape <Card /> expects.
// TMDB doesn't serve actual video files, so we keep the Play button working
// by cycling through our bundled local preview clips (1.mp4 - 16.mp4).
function adaptTmdbResult(item) {
  return {
    id: item.id,
    title: item.title || item.name,
    poster_path: item.poster_path ? `${IMAGE_BASE}${item.poster_path}` : null,
    previewVideo: `/previews/${(item.id % 16) + 1}.mp4`,
    matureRating: item.adult ? "A 18+" : "U/A 13+",
    category: item.media_type === "tv" || item.first_air_date ? "Series" : "Movie",
    quality: "HD",
    genres: [],
    badge: item.vote_average >= 7.5 ? "Top 10" : undefined,
  };
}

export default function Row({ title, fetchUrl, fallbackMovies, onPlay }) {
  const [movies, setMovies] = useState(fallbackMovies || []);

  useEffect(() => {
    let cancelled = false;

    async function fetchRow() {
      if (!TMDB_API_KEY || !fetchUrl) return; // stay on local fallback data
      try {
        const res = await axios.get(fetchUrl);
        const results = (res.data?.results || [])
          .filter((m) => m.poster_path)
          .map(adaptTmdbResult);
        if (!cancelled && results.length) setMovies(results);
      } catch (err) {
        console.warn(`Row "${title}" fetch failed, using local fallback:`, err.message);
      }
    }

    fetchRow();
    return () => {
      cancelled = true;
    };
  }, [fetchUrl, title]);

  if (!movies.length) return null;

  return (
    <div className={styles.Row}>
      <h2 className={styles.title}>{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={6}
        slidesPerGroup={6}
        spaceBetween={6}
        breakpoints={{
          0: { slidesPerView: 3, slidesPerGroup: 3 },
          600: { slidesPerView: 4, slidesPerGroup: 4 },
          900: { slidesPerView: 5, slidesPerGroup: 5 },
          1200: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
      >
        {movies
          .filter((m) => m.poster_path)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <Card movie={movie} onPlay={onPlay} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
