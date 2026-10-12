import Row from "../components/Row";
import { movies } from "../data/Data";

export default function NewPopularPage({ onPlay }) {
  const newItems = movies.filter((m) => m.badge === "New");
  const topItems = movies.filter((m) => m.badge === "Top 10");
  const recent = movies.filter((m) => m.badge === "Recently added");

  return (
    <main className="rows" style={{ paddingTop: "110px" }}>
      <Row title="New Releases" fallbackMovies={newItems} onPlay={onPlay} />
      <Row title="Top 10 This Week" fallbackMovies={topItems} onPlay={onPlay} />
      <Row title="Recently Added" fallbackMovies={recent} onPlay={onPlay} />
    </main>
  );
}
