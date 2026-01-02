import { useState } from "react";
import type { OmdbSearchItem } from "../api/omdbApi.ts";
import { omdbApi } from "../api/omdbApi.ts";
import nexteplogo from "../assets/nextepmovie.png";
import type { MovieCardProps } from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

const mapToMovieCard = (item: OmdbSearchItem): MovieCardProps => ({
  id: item.imdbID,
  title: item.Title,
  year: item.Year,
  type: item.Type,
  poster: item.Poster && item.Poster !== "N/A" ? item.Poster : undefined,
});

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (term: string) => {
    if (!term) return;
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const { items } = await omdbApi.searchMovies({ query: term, page: 1 });
      const mapped = (items ?? []).map(mapToMovieCard);
      setResults(mapped);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al buscar peliculas";
      setError(message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const moviesToShow = results;
  const hasNoResults =
    hasSearched && !isLoading && !error && results.length === 0;
  const shouldShowResultsSection = hasSearched;

  return (
    <div className="page">
      <section>
        <div className="top-bar">
          <img src={nexteplogo} alt="Nextep Logo" width={300} />
          <span className="eyebrow">
            Movie Explorer by <b>Anthony Monsalve</b>
          </span>
        </div>
      </section>
      <section className="hero">
        <div className="hero-content">
          <h1>Encuentra tu proxima pelicula favorita</h1>
          <p className="lead">
            Busca titulos, revisa fichas y explora detalles al instante.
          </p>
          <div className="search-area">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder="Busca por titulo, ej. Inception, Batman, Oppenheimer"
              isLoading={isLoading}
            />
            <p className="search-hint">
              Tip: empieza con un titulo y luego refina por anio o tipo. Los
              resultados se muestran en la cuadrigula inferior.
            </p>
          </div>
        </div>
      </section>
      {shouldShowResultsSection ? (
        <section className="section">
          <div className="section-header">
            <h2>Resultados de la busqueda</h2>
            <p className="muted">
              {hasSearched
                ? "Mostrando los titulos que coinciden con tu busqueda."
                : "Usa la barra de arriba para explorar el catalogo."}
            </p>
          </div>

          {error ? <div className="status status-error">{error}</div> : null}
          {hasNoResults ? (
            <div className="status">Sin resultados para esa busqueda.</div>
          ) : null}

          {moviesToShow.length > 0 && <MovieGrid movies={moviesToShow} />}
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
