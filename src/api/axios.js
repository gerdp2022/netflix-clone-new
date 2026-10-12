import axios from "axios";

// Base instance for The Movie Database (TMDB) API.
// Add your own key in a .env file at the project root:
//   VITE_TMDB_API_KEY=your_key_here
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BANNER_BASE = "https://image.tmdb.org/t/p/original/";

export default instance;
