import { useState } from "react";
import type { OmdbSearchItem } from "../api/omdbApi.ts";
import { omdbApi } from "../api/omdbApi.ts";
import nexteplogo from "../assets/nextepmovie.png";
import FilterBar from "../components/FilterBar";
import type { MovieCardProps } from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination.tsx";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

type FilterType = "" | "movie" | "series" | "episode";
type FilterState = { type: FilterType; year: string };
const PAGE_SIZE = 10;

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
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    type: "",
    year: "",
  });

  const performSearch = async (
    term: string,
    nextPage = 1,
    nextFilters: FilterState = filters
  ) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    const typeParam = nextFilters.type || undefined;
    const yearParam = nextFilters.year.trim() || undefined;

    try {
      const { items, totalResults: apiTotal } = await omdbApi.searchMovies({
        query: term,
        page: nextPage,
        type: typeParam,
        year: yearParam,
      });
      const mapped = (items ?? []).map(mapToMovieCard);
      setResults(mapped);
      setTotalResults(apiTotal);
      setPage(nextPage);
      setFilters(nextFilters);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al buscar peliculas";
      setError(message);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    if (!term) return;
    setQuery(term);
    await performSearch(term, 1, filters);
  };

  const handleTypeChange = (type: FilterType) => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleYearChange = (year: string) => {
    const sanitized = year.slice(0, 4);
    setFilters((prev) => ({ ...prev, year: sanitized }));
  };

  const applyFilters = () => {
    if (query) {
      performSearch(query, 1, filters);
    }
  };

  const handleResetFilters = () => {
    const reset: FilterState = { type: "", year: "" };
    setFilters(reset);
    if (query) {
      performSearch(query, 1, reset);
    }
  };

  const handlePageChange = (nextPage: number) => {
    if (!query) return;
    performSearch(query, nextPage, filters);
  };

  const moviesToShow = results;
  const hasNoResults =
    hasSearched && !isLoading && !error && results.length === 0;
  const shouldShowResultsSection = hasSearched;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const shouldShowPagination = moviesToShow.length > 0 && totalPages > 1;

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

          <div className="results-toolbar">
            <FilterBar
              type={filters.type}
              year={filters.year}
              onTypeChange={handleTypeChange}
              onYearChange={handleYearChange}
              onReset={handleResetFilters}
              onApply={applyFilters}
              disabled={isLoading}
            />
          </div>

          {error ? <div className="status status-error">{error}</div> : null}
          {hasNoResults ? (
            <div className="status">Sin resultados para esa busqueda.</div>
          ) : null}

          {moviesToShow.length > 0 && <MovieGrid movies={moviesToShow} />}
          {shouldShowPagination ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              totalResults={totalResults}
              onChange={handlePageChange}
              disabled={isLoading}
            />
          ) : null}
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
