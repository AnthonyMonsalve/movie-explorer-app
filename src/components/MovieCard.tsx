import "./MovieCard.css";

export type MovieCardProps = {
  id: string;
  title: string;
  year: string;
  type: string;
  poster?: string;
};

type MovieCardComponentProps = {
  movie: MovieCardProps;
};

const MovieCard = ({ movie }: MovieCardComponentProps) => {
  const hasPoster = Boolean(movie.poster);

  return (
    <article className="movie-card">
      <div className="poster">
        {hasPoster ? (
          <img
            src={movie.poster}
            alt={`Póster de ${movie.title}`}
            loading="lazy"
          />
        ) : (
          <span className="pill">Sin póster</span>
        )}
        <span className="poster-badge">{movie.type}</span>
      </div>
      <div className="movie-card-body">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="pill">{movie.year}</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
