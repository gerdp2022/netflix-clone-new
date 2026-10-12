import Row from "../components/Row";
import { movies } from "../data/Data";

export default function TvShowsPage({ onPlay }) {
  const items = movies.filter((m) => m.category === "Series");

  return (
    <main className="rows" style={{ paddingTop: "110px" }}>
      <Row title="TV Shows" fallbackMovies={items} onPlay={onPlay} />
      <Row title="Drama Series" fallbackMovies={items.filter((m) => m.genres.includes("Drama"))} onPlay={onPlay} />
    </main>
  );
}
