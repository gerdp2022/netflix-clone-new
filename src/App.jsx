import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VideoModal from "./components/VideoModal";
import { MyListProvider } from "./context/MyListContext";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";
import NewPopularPage from "./pages/NewPopularPage";
import MyListPage from "./pages/MyListPage";
import BrowseLanguagePage from "./pages/BrowseLanguagePage";

import "./App.css";

function App() {
  const [playingMovie, setPlayingMovie] = useState(null);

  return (
    <MyListProvider>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage onPlay={setPlayingMovie} />} />
          <Route path="/movies" element={<MoviesPage onPlay={setPlayingMovie} />} />
          <Route path="/tv-shows" element={<TvShowsPage onPlay={setPlayingMovie} />} />
          <Route path="/new-popular" element={<NewPopularPage onPlay={setPlayingMovie} />} />
          <Route path="/my-list" element={<MyListPage onPlay={setPlayingMovie} />} />
          <Route path="/browse-language" element={<BrowseLanguagePage />} />
        </Routes>

        <Footer />

        {playingMovie && (
          <VideoModal movie={playingMovie} onClose={() => setPlayingMovie(null)} />
        )}
      </div>
    </MyListProvider>
  );
}

export default App;
