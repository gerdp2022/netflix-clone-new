import Row from "../components/Row";
import { movies } from "../data/Data";
import { useMyList } from "../context/MyListContext";

export default function MyListPage({ onPlay }) {
  const { ids } = useMyList();
  const items = movies.filter((m) => ids.has(m.id));

  return (
    <main className="rows" style={{ paddingTop: "110px", minHeight: "60vh" }}>
      {items.length ? (
        <Row title="My List" fallbackMovies={items} onPlay={onPlay} />
      ) : (
        <p style={{ padding: "0 4%", color: "#a6a6a6" }}>
          Your list is empty. Hover any title and hit the "+" button to add it here.
        </p>
      )}
    </main>
  );
}
