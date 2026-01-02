import './MovieCard.css'

export type MovieCardProps = {
  id: string
  title: string
  year: string
  type: string
  poster?: string
}

type MovieCardComponentProps = {
  movie: MovieCardProps
  onSelect?: (id: string) => void
}

const MovieCard = ({ movie, onSelect }: MovieCardComponentProps) => {
  const hasPoster = Boolean(movie.poster)
  const badgeClass =
    movie.type === 'movie'
      ? 'poster-badge badge-movie'
      : movie.type === 'series'
        ? 'poster-badge badge-series'
        : 'poster-badge badge-episode'

  return (
    <article
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(movie.id)}
    >
      <div className="poster">
        {hasPoster ? (
          <img src={movie.poster} alt={`Poster de ${movie.title}`} loading="lazy" />
        ) : (
          <span className="pill">Sin poster</span>
        )}
        <span className={badgeClass}>{movie.type}</span>
      </div>
      <div className="movie-card-body">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="pill">{movie.year}</span>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
