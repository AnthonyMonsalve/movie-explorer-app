import MovieCard, { type MovieCardProps } from './MovieCard'
import './MovieGrid.css'

type MovieGridProps = {
  movies: MovieCardProps[]
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
