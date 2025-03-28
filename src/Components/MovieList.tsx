// MovieList.tsx
import { useFavorites } from '../Hooks/useFavorites';
import { Movie } from '../Services/types';
import '../styles/movieList.css';

interface MovieListProps {
  movies: Movie[];

}

export const MovieList = ({ movies }: MovieListProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="movie-grid">
      {movies.map((movie) => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);

        return (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <h5>{movie.overview}</h5>
              <p>⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie);
              }}
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        );
      })}
    </div>
  );
};