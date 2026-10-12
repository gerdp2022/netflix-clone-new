import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../api/requests";
import { localRows } from "../data/Data";

const ROW_CONFIG = [
  { title: "Trending Now", fetchUrl: requests.fetchTrending },
  { title: "Netflix Originals", fetchUrl: requests.fetchNetflixOriginals },
  { title: "Top Rated", fetchUrl: requests.fetchTopRatedMovies },
  { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
  { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
  { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
];

export default function HomePage({ onPlay }) {
  return (
    <>
      <Banner onPlay={onPlay} />
      <main className="rows">
        {ROW_CONFIG.map((row, i) => (
          <Row
            key={row.title}
            title={row.title}
            fetchUrl={row.fetchUrl}
            fallbackMovies={localRows[i % localRows.length].movies}
            onPlay={onPlay}
          />
        ))}
      </main>
    </>
  );
}
