import Row from "../components/Row";
import { movies } from "../data/Data";

export default function MoviesPage({ onPlay }) {
  const items = movies.filter((m) => m.category === "Movie");

  return (
    <main className="rows" style={{ paddingTop: "110px" }}>
      <Row title="Movies" fallbackMovies={items} onPlay={onPlay} />
      <Row title="Action Movies" fallbackMovies={items.filter((m) => m.genres.includes("Action"))} onPlay={onPlay} />
      <Row title="Adventure & Fantasy" fallbackMovies={items.filter((m) => m.genres.includes("Adventure") || m.genres.includes("Fantasy"))} onPlay={onPlay} />
    </main>
  );
}
