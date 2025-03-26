import { Movie } from "../Services/types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average.toFixed(1)}</p>
      <p>{movie.overview}</p>
      <p>{new Date(movie.release_date).toLocaleDateString()}</p>
    </div>
  );
};

export default MovieCard;