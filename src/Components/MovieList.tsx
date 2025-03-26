import { Movie } from "../Services/types";

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movieId: number) => void; // Para manejar clicks en películas
}

export const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map((movie) => (
        <div 
          key={movie.id}
          onClick={() => onMovieClick?.(movie.id)} // Opcional: para abrir modal
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          {/* Imagen de la película */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-movie.jpg'; // Fallback si la imagen no carga
            }}
          />
          
          {/* Detalles de la película */}
          <div className="p-4">
            <h3 className="font-bold text-lg truncate">{movie.title}</h3>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 text-gray-700">
                {movie.vote_average.toFixed(1)}/10
              </span>
              <span className="ml-auto text-sm text-gray-500">
                {movie.release_date.split('-')[0]} {/* Muestra solo el año */}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};