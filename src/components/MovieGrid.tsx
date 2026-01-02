import MovieCard, { type MovieCardProps } from './MovieCard'
import './MovieGrid.css'

type MovieGridProps = {
  movies: MovieCardProps[]
  onSelect?: (id: string) => void
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default MovieGrid
