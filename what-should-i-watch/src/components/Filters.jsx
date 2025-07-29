import { useEffect, useState } from "react";
import { getWithFilters } from "./services/call-functions.js";
import genreData from "../assets/data/tmdbGenres.json";
import providerData from "../assets/data/watchProvidersIDsNames.json";
import { options } from "./services/call-headers.js";

export function Filters({ setMovieList }) {
  const [genres, setGenres] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [selectedProvider, setSelectedProvider] = useState();

  useEffect(() => {
    setGenres(genreData);
    setProviders(providerData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movies = await getWithFilters({
      type: "movie",
      genreId: selectedGenre,
      providerId: selectedProvider,
      payload: options,
    });
    setMovieList(movies);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-zinc-800 text-white"
    >
      <div>
        <label className="block mb-1">Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Provider</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="w-full p-2 rounded bg-zinc-700"
        >
          <option value="">All Providers</option>
          {providers.map((p) => (
            <option key={p.provider_id} value={p.provider_id}>
              {p.provider_name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-indigo-600 px-4 py-2 rounded">
        Get Picks
      </button>
    </form>
  );
}
